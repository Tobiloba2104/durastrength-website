from flask import Flask, render_template, request, redirect, session, url_for
import sqlite3
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)


app.secret_key = os.environ.get("SECRET_KEY", "dev-key-change-in-production")

DATABASE = "quotes.db"

UPLOAD_FOLDER = "static/images"

ALLOWED_EXTENSIONS = {
    "png",
    "jpg",
    "jpeg",
    "webp"
}

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "dura123")


def init_db():

    os.makedirs(UPLOAD_FOLDER, exist_ok=True)

    conn = sqlite3.connect(DATABASE)

    cursor = conn.cursor()


    cursor.execute("""
        CREATE TABLE IF NOT EXISTS quotes (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            name TEXT NOT NULL,

            phone TEXT NOT NULL,

            property_type TEXT,

            solar_need TEXT,

            message TEXT,

            created_at TIMESTAMP
            DEFAULT CURRENT_TIMESTAMP

        )
    """)


    cursor.execute("""
        CREATE TABLE IF NOT EXISTS products (

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            name TEXT NOT NULL,

            description TEXT,

            price TEXT,

            image TEXT,

            category TEXT

        )
    """)


    cursor.execute(
        "PRAGMA table_info(products)"
    )

    columns = [
        column[1]
        for column in cursor.fetchall()
    ]


    if "category" not in columns:

        cursor.execute("""
            ALTER TABLE products
            ADD COLUMN category TEXT
        """)


    if "image" not in columns:

        cursor.execute("""
            ALTER TABLE products
            ADD COLUMN image TEXT
        """)


    if "price" not in columns:

        cursor.execute("""
            ALTER TABLE products
            ADD COLUMN price TEXT
        """)


    if "description" not in columns:

        cursor.execute("""
            ALTER TABLE products
            ADD COLUMN description TEXT
        """)


    cursor.execute(
        "PRAGMA table_info(quotes)"
    )

    quote_columns = [
        column[1]
        for column in cursor.fetchall()
    ]


    if "created_at" not in quote_columns:

        cursor.execute("""
            ALTER TABLE quotes
            ADD COLUMN created_at TIMESTAMP
        """)


    cursor.execute("""
        SELECT COUNT(*)
        FROM products
    """)

    product_count = cursor.fetchone()[0]


    if product_count == 0:

        default_products = [

            (
                "Itel Power Tank",
                "Reliable solar power tank powering 42inches TV, DC rechargeable fans, charging of phones, laptops and other gadgets.",
                "",
                "itel power tank.jpeg",
                "panel"
            ),

            (
                "Power Station",
                "Reliable Solar Power Station powering phones, laptops, small DC rechargeable fan and router WiFi.",
                "",
                "power station.jpeg",
                "inverter"
            ),

            (
                "Colasolar",
                "Colasolar is suitable for 2-3 bedroom houses, powering Big TV, laptop, phones, sound system, inverter freezer and other gadgets.",
                "",
                "colasolar.jpeg",
                "battery"
            ),

            (
                "18inches Rechargeable Solar Fan",
                "Stay cool and comfortable with our powerful 18-inch rechargeable fan, designed to provide reliable airflow at home, in the office, or during power outages.",
                "",
                "18inches solar fan.jpeg",
                "fan"
            ),

            (
                "Solar Rechargeable Fan",
                "A compact and convenient rechargeable fan designed to keep you cool wherever you need it. Suitable for everyday use at home, work, or while travelling.",
                "",
                "recharge fan.jpeg",
                "fan"
            )

        ]


        cursor.executemany("""

            INSERT INTO products
            (
                name,
                description,
                price,
                image,
                category
            )

            VALUES (?, ?, ?, ?, ?)

        """, default_products)


    conn.commit()

    conn.close()


init_db()


def allowed_file(filename):

    return (

        "." in filename

        and

        filename.rsplit(
            ".",
            1
        )[1].lower()

        in ALLOWED_EXTENSIONS

    )


@app.route("/")
def home():

    conn = sqlite3.connect(
        DATABASE
    )

    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()


    cursor.execute("""
        SELECT *
        FROM products
        ORDER BY id DESC
    """)

    products = cursor.fetchall()


    conn.close()


    return render_template(

        "index.html",

        products=products

    )


@app.route(
    "/submit-quote",
    methods=["POST"]
)
def submit_quote():

    name = request.form.get(
        "name"
    )

    phone = request.form.get(
        "phone"
    )

    property_type = request.form.get(
        "property_type"
    )

    solar_need = request.form.get(
        "solar_need"
    )

    message = request.form.get(
        "message"
    )


    conn = sqlite3.connect(
        DATABASE
    )

    cursor = conn.cursor()


    cursor.execute("""
        INSERT INTO quotes

        (
            name,
            phone,
            property_type,
            solar_need,
            message
        )

        VALUES (?, ?, ?, ?, ?)

    """, (

        name,

        phone,

        property_type,

        solar_need,

        message

    ))


    conn.commit()

    conn.close()


    return "success"


@app.route(
    "/admin-login",
    methods=["GET", "POST"]
)
def admin_login():

    if request.method == "POST":

        username = request.form.get(
            "username"
        )

        password = request.form.get(
            "password"
        )


        if (

            username == ADMIN_USERNAME

            and

            password == ADMIN_PASSWORD

        ):

            session[
                "admin_logged_in"
            ] = True


            return redirect(
                "/admin"
            )


        return render_template(

            "admin_login.html",

            error="Invalid username or password"

        )


    return render_template(
        "admin_login.html"
    )


@app.route("/admin")
def admin():


    if not session.get(
        "admin_logged_in"
    ):

        return redirect(
            "/admin-login"
        )


    conn = sqlite3.connect(
        DATABASE
    )

    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()


    cursor.execute("""
        SELECT *

        FROM quotes

        ORDER BY id DESC
    """)

    quotes = cursor.fetchall()


    cursor.execute("""
        SELECT *

        FROM products

        ORDER BY id DESC
    """)

    products = cursor.fetchall()


    cursor.execute("""
        SELECT COUNT(*)
        FROM products
    """)

    product_count = cursor.fetchone()[0]


    cursor.execute("""
        SELECT COUNT(*)
        FROM quotes
    """)

    quote_count = cursor.fetchone()[0]


    conn.close()


    return render_template(

        "admin.html",

        quotes=quotes,

        products=products,

        product_count=product_count,

        quote_count=quote_count

    )


@app.route(
    "/add-product",
    methods=["POST"]
)
def add_product():

    if not session.get(
        "admin_logged_in"
    ):

        return redirect(
            "/admin-login"
        )


    name = request.form.get(
        "name"
    )

    description = request.form.get(
        "description"
    )

    price = request.form.get(
        "price"
    )

    category = request.form.get(
        "category"
    )


    image = request.files.get(
        "image"
    )


    filename = ""


    if (

        image

        and

        image.filename != ""

    ):

        if allowed_file(
            image.filename
        ):

            filename = secure_filename(
                image.filename
            )


            image.save(

                os.path.join(

                    app.config[
                        "UPLOAD_FOLDER"
                    ],

                    filename

                )

            )


    conn = sqlite3.connect(
        DATABASE
    )

    cursor = conn.cursor()


    cursor.execute("""
        INSERT INTO products

        (
            name,
            description,
            price,
            image,
            category
        )

        VALUES (?, ?, ?, ?, ?)

    """, (

        name,

        description,

        price,

        filename,

        category

    ))


    conn.commit()

    conn.close()


    return redirect(
        "/admin"
    )


@app.route(
    "/edit-product/<int:product_id>",
    methods=["GET", "POST"]
)
def edit_product(
    product_id
):

    if not session.get(
        "admin_logged_in"
    ):

        return redirect(
            "/admin-login"
        )


    conn = sqlite3.connect(
        DATABASE
    )

    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()


    if request.method == "POST":

        name = request.form.get(
            "name"
        )

        description = request.form.get(
            "description"
        )

        price = request.form.get(
            "price"
        )

        category = request.form.get(
            "category"
        )


        image = request.files.get(
            "image"
        )


        cursor.execute("""
            SELECT *

            FROM products

            WHERE id = ?

        """, (

            product_id,

        ))


        product = cursor.fetchone()


        if not product:

            conn.close()

            return "Product not found"


        filename = product["image"]


        if (

            image

            and

            image.filename != ""

        ):

            if allowed_file(
                image.filename
            ):

                new_filename = secure_filename(

                    image.filename

                )


                image.save(

                    os.path.join(

                        app.config[
                            "UPLOAD_FOLDER"
                        ],

                        new_filename

                    )

                )


                if filename and filename != new_filename:

                    old_image = os.path.join(

                        app.config[
                            "UPLOAD_FOLDER"
                        ],

                        filename

                    )


                    if os.path.exists(
                        old_image
                    ):

                        os.remove(
                            old_image
                        )


                filename = new_filename


        cursor.execute("""

            UPDATE products

            SET

                name = ?,

                description = ?,

                price = ?,

                image = ?,

                category = ?

            WHERE id = ?

        """, (

            name,

            description,

            price,

            filename,

            category,

            product_id

        ))


        conn.commit()

        conn.close()


        return redirect(
            "/admin"
        )


    cursor.execute("""
        SELECT *

        FROM products

        WHERE id = ?

    """, (

        product_id,

    ))


    product = cursor.fetchone()


    conn.close()


    if not product:

        return "Product not found"


    return render_template(

        "edit_product.html",

        product=product

    )


@app.route(
    "/delete-product/<int:product_id>"
)
def delete_product(
    product_id
):

    if not session.get(
        "admin_logged_in"
    ):

        return redirect(
            "/admin-login"
        )


    conn = sqlite3.connect(
        DATABASE
    )

    cursor = conn.cursor()


    cursor.execute("""

        SELECT image

        FROM products

        WHERE id = ?

    """, (

        product_id,

    ))


    product = cursor.fetchone()


    if (

        product

        and

        product[0]

    ):

        image_path = os.path.join(

            app.config[
                "UPLOAD_FOLDER"
            ],

            product[0]

        )


        if os.path.exists(
            image_path
        ):

            os.remove(
                image_path
            )


    cursor.execute("""

        DELETE FROM products

        WHERE id = ?

    """, (

        product_id,

    ))


    conn.commit()

    conn.close()


    return redirect(
        "/admin"
    )


@app.route(
    "/admin-logout"
)
def admin_logout():

    session.clear()


    return redirect(
        "/admin-login"
    )


if __name__ == "__main__":
    debug_mode = os.environ.get("FLASK_DEBUG", "False") == "True"

    app.run(
        debug=debug_mode
    )