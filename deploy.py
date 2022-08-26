import sys
import os
import logging

from paramiko import SSHClient, AutoAddPolicy
from scp import SCPClient


logging.basicConfig(level=logging.INFO)

destination_dir = '/home/dev/build'

def get_directory_size(dir_name):
    size = 0
    for path, dirs, files in os.walk(dir_name):
        for f in files:
            fp = os.path.join(path, f)
            size += os.path.getsize(fp)
    return size

try:
    build_dir = sys.argv[1]
    server_ip = sys.argv[2]
    password = sys.argv[3]

except IndexError:  
    logging.info("Put (1) build directory, (2) server ip, (3) password as arguments")
    sys.exit()

if not os.path.exists(build_dir):
    logging.info(f"Directory {build_dir} does not exist")
    sys.exit()

if build_dir[-1] != '/':
    build_dir += '/'
    logging.info(f"Added slash to build directory = {build_dir}")

ssh = SSHClient()
ssh.set_missing_host_key_policy(AutoAddPolicy())
logging.info(f"Connecting to the server {server_ip}")
ssh.connect(hostname=server_ip, username='root', password=password)
logging.info("Connection successful!")

ssh.exec_command(f"rm -rf {destination_dir}/*")
logging.info(f"Old {destination_dir} directory content has been removed by \"rm -rf {destination_dir}/*\"")
scp = SCPClient(ssh.get_transport())
logging.info(f"SCP client has been created, transferring {build_dir} directory (total size: {get_directory_size(build_dir)})")
scp.put(build_dir, recursive=True, remote_path=destination_dir)
logging.info(f"Directory {build_dir} has been transferred")
ssh.exec_command('systemctl restart nginx')
logging.info("Nginx server restarted, new application should work under 'https://matcher.pl'")
scp.close()
ssh.close()

