#!/bin/sh
# Ensure all javascript files staged for commit pass standard code style
git diff --name-only --cached --relative | grep '\.jsx\?$' | sh -c "standard | snazzy"
if [ $? -ne 0 ]; then exit 1; fi
