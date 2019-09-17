#!/usr/bin/env python

# Utility to start local webserver for specified build target

import os
import sys
from functools import partial

# argv[0] = program, argv[1] = buildname, len=2
if len(sys.argv) == 1: # load defaultBuild from settings file
    try:
        from localbuildsettings import defaultBuild as buildName
    except ImportError:
        print("Usage: %s buildname [--port=8000]" % os.path.basename(sys.argv[0]))
        sys.exit(1)
else: # build name from command line
    buildName = sys.argv[1]

dir = os.path.join(os.getcwd(), 'build', buildName)
if not os.path.exists(dir) or os.path.isfile(dir):
    print("Directory not found: %s" % dir)
    sys.exit(1)

startWebServerPort = 8000
if len(sys.argv) >= 3:
    port = sys.argv[2].split('=')
    if len(port) == 2:
        startWebServerPort = int(port[1])

if sys.hexversion < 0x03070000:
    print('Error: Python at least version 3.7 required')
    sys.exit(1)

from http.server import test, SimpleHTTPRequestHandler
handler_class = partial(SimpleHTTPRequestHandler, directory=dir)
print("Update channel: %s" % buildName)
test(HandlerClass=handler_class, port=startWebServerPort, bind='localhost')
