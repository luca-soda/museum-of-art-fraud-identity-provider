REGISTRY_NAME = museumofartfraud
IMAGE_NAME = identity-provider

build:
	docker build . -t $(REGISTRY_NAME).azurecr.io/$(IMAGE_NAME)

push:
	az acr login --name $(REGISTRY_NAME)
	docker push $(REGISTRY_NAME).azurecr.io/$(IMAGE_NAME)