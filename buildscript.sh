#!/bin/bash
# download mkc first, https://github.com/microsoft/pxt-mkc
# pnpm i -g makecode
# this script downloads and compiles the latest project
# the if statement is to allow updating projects while also not building duplicates


# goofy way of checking if the package is already installed
#   if [ $(pnpm list -g | grep makecode -o) = "makecode" ]; then
#       echo "skipping dependencies because they seem already present"
#   else
#       echo "installing the dependencies"
#       pnpm setup
#       source ~/.bashrc
#       pnpm i -g makecode -s
#   fi

# this is currently not used because we're using npm in practice

# check if the time of the latest project on the database matches the time of the latest built package to allow re-entering the same url to update a project
if [ $(curl https://upload.tectrix.dev/api/latestime -s | tr -d '"') = $(cat ~/latest.txt) ]; then
    echo "no new projects found"
else
    echo "setting up filetree"
    cd ~
    rm -r ./arcade/
    mkdir ./arcade/
    cd arcade/
    echo "downloading files"
    mkc download $(curl https://upload.tectrix.dev/api/latesturl -s | tr -d '"')
    echo "building project"
    mkc build -f rawELF --hw rpi
    # name file to project name
    mv built/rpi/binary.elf ~/RetroPie/roms/makecode/$(cat ~/arcade/pxt.json | jq -r '.name' | tr -cd '[:alnum:] ' | tr ' ' '_' ).elf
    echo "finishing"
    echo $(curl https://upload.tectrix.dev/api/latestime -s | tr -d '"') > ~/latest.txt
    echo "done"
    sleep 5
    play ~/ping.mp3
fi
