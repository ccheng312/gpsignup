# GP Signups

## Setup
- Download and install [Vagrant](https://www.vagrantup.com/downloads.html)
- Download and install [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
- Clone the repo
- `cd gpsignups`
- `vagrant up`
    - See https://docs.vagrantup.com/v2/getting-started/up.html for more info on
    vagrant commands. Your first time this will download a centos6 image and
    all packages, it can take a while.
- `vagrant ssh`
- `cd /vagrant`

## Start Server
- `vagrant ssh`
- `cd /vagrant`
- `node server.js`

## View in browser
- Point your browser to `localhost:8080` and you will see the app

## Tips

- Use `vagrant suspend` to temporarily stop your virtual machine and `vagrant resume` to start it again
- Use `vagrant destroy` to blow your VM away if it has problems. Run `vagrant up` again to re-provision the virtual machine.
