#!/bin/bash

# Recursively list directories, excluding unwanted ones
find . -type d \
  ! -path "./node_modules*" \
  ! -path "./.venv*" \
  ! -path "./.turbo*" \
  ! -path "./dist*" \
  ! -path "./.next*" \
  ! -path "./__pycache__*" \
  ! -path "./env*" \
  ! -path "./build*" \
  ! -path "./.git*"
