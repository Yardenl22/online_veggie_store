import hashlib
from datetime import datetime
from enum import Enum
from typing import Annotated

from pydantic import BaseModel, Field, PlainValidator


class CategoryEnum(str, Enum):
    FRUIT = 'fruits'
    VEGETABLE = 'vegetables'


class ProductSForCategoryRequest(BaseModel):
    category: CategoryEnum
    page_size: Annotated[int, Field(default=20, alias='pageSize')]
    page: Annotated[int, Field(default=1, alias='page')]


class Product(BaseModel):
    name: Annotated[str, PlainValidator(str)]
    price: Annotated[float, PlainValidator(float)]

    @property
    def _id(self):
        hash_str = f'{self.name}-{str(self.price)})'
        encoded_hash_str = hash_str.encode()
        product_id = hashlib.md5(encoded_hash_str).hexdigest()
        return product_id

    def to_dict(self):
        data = self.model_dump()
        data['_id'] = self._id
        return data

class CartItem(BaseModel):
    product: Product
    quantity: Annotated[int, PlainValidator(int)]


class ShoppingCartRequest(BaseModel):
    items: list[CartItem]
    total_items: Annotated[int, PlainValidator(int)]
    total_price: Annotated[float, PlainValidator(float)]


class ShoppingCart(BaseModel):
    client_ip: str = Field(default='')  # convert it to user_name/cookie in the future
    items: dict[str, int]
    total_items: int = Field(default=0)
    total_price: float = Field(default=0.0)

    def to_dict(self):
        return {
            "_id": self._id,
            "save_date": self.save_date,
            "items": self.items,
            "total_items": self.total_items,
            "total_price": self.total_price,
        }

    @property
    def save_date(self):
        return datetime.now().isoformat()

    @property
    def _id(self) -> str:
        items_str = '-'.join(f"{name}:{qty}" for name, qty in self.items.items())
        hash_str = f"{self.client_ip}-{items_str}"
        shopping_cart_id = hashlib.md5(hash_str.encode()).hexdigest()

        return shopping_cart_id
