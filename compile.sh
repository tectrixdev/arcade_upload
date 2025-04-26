#!/bin/bash

# download mkc first, https://github.com/microsoft/pxt-mkc
# pnpm i -g makecode
# this script downloads and compiles the latest project
# the if statement is to allow updating projects while also not building duplicates

if [ $(pnpm list -g | grep makecode -o) = "makecode" ]; then
    echo "skipping dependencies because they seem already present"
else
    echo "installing the dependencies"
    pnpm setup
    source ~/.bashrc
    pnpm i -g makecode -s
fi

echo "setting up filetree"
rm -r /tmp/arcade/
mkdir /tmp/arcade/ -p
cd /tmp/arcade/
echo "downloading files"
mkc download $1
echo "building project"
mkc build -f rawELF --hw rpi
mkdir ~/compiled/ -p
mv built/rpi/binary.elf ~/compiled/$(cat /tmp/arcade/pxt.json | jq -r '.name' | tr -cd '[:alnum:] ' | tr ' ' '_').elf
echo "finishing"
echo "done"
