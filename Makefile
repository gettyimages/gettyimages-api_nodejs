shell = /bin/sh
UID := $(shell id -u)
GID := $(shell id -g)



# Run a Node container with the current directory mounted and as the current user.
# This allows development without installing NodeJS on your system.
docker:
	env UID=${UID} GID=${UID} docker run -it --net=host -v /${PWD}:/workdir -w //workdir -u ${UID}:${GID} node:16 /bin/bash
	