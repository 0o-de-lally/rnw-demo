#!/bin/sh
set -e

# Install dependencies silently
apt update
apt install -y curl

# Display version
echo "Libra binary info:"
which libra
libra version
sleep 3

# Download framework
echo "Downloading framework..."
mkdir -p /usr/libra/framework/releases/
curl -sL https://github.com/0LNetworkCommunity/libra-framework/releases/download/7.0.3/release-7.0.3.mrb -o /usr/libra/framework/releases/head.mrb

echo "Starting Libra node: $ME"
export MODE_0L="TESTNET"
libra ops testnet --framework-mrb-path /usr/libra/framework/releases/head.mrb configure --host alice:6180 --host bob:6180 --host carol:6180 --test-dir $HOME/.libra

# PATCH: open ports in node config
echo "Opening ports in node config..."
sed -i 's/127.0.0.1/0.0.0.0/g' $HOME/.libra/operator_files/$ME/validator.yaml

echo "hack: moving the genesis folder to where it's expected"
cp -r $HOME/.libra/genesis $HOME/.libra/operator_files/$ME/

echo "Starting up the libra node..."
RUST_LOG=INFO libra node -c $HOME/.libra/operator_files/$ME/validator.yaml
