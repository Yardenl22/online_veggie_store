import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from src import router, config, utils


HOST: str = config.SERVICE.HOST
PORT: int = config.SERVICE.PORT

app = FastAPI(
    title='Online Veggie Store API',
    description="An API to manage shopping carts, products, and orders."
)

origins_urls = ["http://localhost:4200"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins_urls,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/', include_in_schema=False)
def root_redirect():
    return RedirectResponse(url='/docs')


app.include_router(router, dependencies=[Depends(utils.get_storage)])


if __name__ == '__main__':
    uvicorn.run(app, host=HOST, port=PORT)
