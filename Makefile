.PHONY: help install dev start build test test-watch test-coverage prisma-generate prisma-migrate prisma-studio prisma-push prisma-reset clean

help:
	@echo "Available commands:"
	@echo "  make install         - Install dependencies"
	@echo "  make dev            - Run development server"
	@echo "  make start          - Run production server"
	@echo "  make build          - Build the application"
	@echo "  make test           - Run tests"
	@echo "  make test-watch     - Run tests in watch mode"
	@echo "  make test-coverage  - Run tests with coverage"
	@echo "  make prisma-generate - Generate Prisma client"
	@echo "  make prisma-migrate  - Run Prisma migrations"
	@echo "  make prisma-studio   - Open Prisma Studio"
	@echo "  make prisma-push     - Push schema to database"
	@echo "  make prisma-reset    - Reset database"
	@echo "  make clean          - Clean generated files and dependencies"

install:
	bun install

dev:
	bun --watch src/main.ts

start:
	bun src/main.ts

build:
	@echo "Building application..."
	bun build src/main.ts --outdir ./dist

test:
	bun run test

test-watch:
	bun run test:watch

test-coverage:
	bun run test:coverage

prisma-generate:
	bunx prisma generate

prisma-migrate:
	bunx prisma migrate dev

prisma-studio:
	bunx prisma studio

prisma-push:
	bunx prisma db push

prisma-reset:
	bunx prisma migrate reset --force

clean:
	rm -rf node_modules
	rm -rf dist
	rm -rf coverage
	rm -rf src/generated
	@echo "Cleaned successfully!"

setup: install prisma-generate
	@echo "Project setup complete!"

reset-all: clean setup
	@echo "Full reset complete!"
