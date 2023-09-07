# FROM mongo:7

# RUN echo "password" > /keyfile \
#   && chmod 600 /keyfile \
#   && chown 999 /keyfile


# CMD ["--replSet", "rs0", "--bind_ip_all", "--keyFile", "/keyfile"]