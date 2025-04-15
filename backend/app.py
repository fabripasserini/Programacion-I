from main.__init__ import create_app, db
import os
from dotenv import load_dotenv
load_dotenv()
app = create_app()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=os.getenv('PORT'))
