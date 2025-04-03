#!/bin/bash
# download mkc first, https://github.com/microsoft/pxt-mkc
# pnpm i -g makecode
# this script downloads and compiles the latest project
# the if statement is to allow updating projects while also not building duplicates


# goofy way of checking if the package is already installed
if [ $(pnpm list -g | grep makecode -o) == "makecode" ]; then
    echo "skipping dependencies because they seem already present"
else
    echo "installing the dependencies"
    pnpm setup
    source ~/.bashrc
    pnpm i -g makecode -s
fi

# check if the time of the latest project on the database matches the time of the latest built package to allow re-entering the same url to update a project
if [ $(curl https://upload.tectrix.dev/api/latestime -s | tr -d '"') == $(cat ~/Documents/latest.txt) ]; then
    echo "no new projects found"
else
    echo "setting up filetree"
    cd ~/Documents/
    rm -r ./arcade/
    mkdir ./arcade/
    cd arcade/
    echo "downloading files"
    mkc download $(curl https://upload.tectrix.dev/api/latesturl -s | tr -d '"')
    echo "building project"
    mkc build -f rawELF --hw rpi
    # name file to project name
    mv built/rpi/binary.elf ~/Documents/games/$(cat ~/Documents/arcade/pxt.json | jq -r '.name').elf
    echo "finishing"
    echo $(curl https://upload.tectrix.dev/api/latestime -s | tr -d '"') > ~/Documents/latest.txt
    echo "done"
fi
