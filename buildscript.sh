#!/bin/bash
# download mkc first, https://github.com/microsoft/pxt-mkc
# pnpm i -g makecode
# this script downloads and compiles the latest project
# the if statement is to allow updating projects while also not building duplicates
pnpm setup
source ~/.bashrc
pnpm i -g makecode

if [ $(curl https://upload.tectrix.dev/api/latestime -s | tr -d '"') == $(cat ~/Documents/latest.txt) ]; then
    echo "no new projects found"
else
    cd ~/Documents/
    rm -r ./arcade/
    mkdir ./arcade/
    cd arcade/
    mkc download $(curl https://upload.tectrix.dev/api/latesturl -s | tr -d '"')
    mkc build -f rawELF --hw rpi
    mv built/rpi/binary.elf ~/Documents/games/$(curl https://upload.tectrix.dev/api/latesturl -s | tr -d '"' | tr -d 'https://makecode.arcade.com/').elf
    echo $(curl https://upload.tectrix.dev/api/latestime -s | tr -d '"') > ~/Documents/latest.txt
fi
