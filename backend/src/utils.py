import os
from .storage_adapters import StorageInterface, MongoDBStorage, MySQLStorage, TextFileStorage

from src.config import config


STORAGE_OPTION: str = config.SERVICE.STORAGE_OPTION


def get_env_variable(var_name: str) -> str:
    value = os.getenv(var_name)
    if not value:
        raise ValueError(f'Environment variable {var_name} is missing')
    return value


MONGO_CONNECTION_STRING: str = get_env_variable('MONGO_CONNECTION_STRING')
MONGO_DB_NAME: str = get_env_variable('MONGO_DB')
MYSQL_HOST: str = get_env_variable('MYSQL_HOST')
MYSQL_USERNAME: str = get_env_variable('MYSQL_USERNAME')
MYSQL_PASSWORD: str = get_env_variable('MYSQL_PASSWORD')
MYSQL_DB: str = get_env_variable('MYSQL_DB')
TEXT_FILE_PATH: str = get_env_variable('TEXT_FILE_PATH')


def get_storage() -> StorageInterface:
    if STORAGE_OPTION == 'mongodb':
        return MongoDBStorage(MONGO_CONNECTION_STRING, MONGO_DB_NAME)

    elif STORAGE_OPTION == 'mysql':
        return MySQLStorage(MYSQL_HOST, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DB)

    elif STORAGE_OPTION == 'textfile':
        return TextFileStorage(TEXT_FILE_PATH)

    else:
        raise ValueError('Invalid storage option')
