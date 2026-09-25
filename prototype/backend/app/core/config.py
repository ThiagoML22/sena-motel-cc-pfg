from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Motel C.C. API"
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/motel_db"

    class Config:
        env_file = ".env"

settings = Settings()
