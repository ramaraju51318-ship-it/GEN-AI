from fastapi import FastAPI
from pydantic import BaseModel
from google import genai
from fastapi.middleware.cors import CORSMiddleware

# -----------------------
# App setup
# -----------------------
app = FastAPI()

# ✅ Allow frontend (React) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔴 PUT YOUR GOOGLE AI STUDIO API KEY HERE
client = genai.Client(api_key="AIzaSyBzmOaFQUbI9JTl0SW6ysKJkuDaDe2iFKA")

# -----------------------
# Request schema
# -----------------------
class Prompt(BaseModel):
    text: str


# -----------------------
# Routes
# -----------------------
@app.get("/")
def home():
    return {"message": "MarketMind backend running"}


@app.post("/generate")
def generate_text(prompt: Prompt):
    try:
        # ✅ Real Gemini call
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt.text,
        )
        return {"result": response.text}

    except Exception as e:
        # ✅ Fallback demo output if API quota/model fails
        return {
            "result": f"""
MarketMind AI Demo Output

Campaign Idea:
Launch a digital campaign targeting urban commuters in India.

Key Message:
Save fuel money and go eco-friendly with the new electric scooter.

Marketing Channels:
• Instagram reels showing daily commute savings
• Influencer reviews in metro cities
• College campus test ride events
• Google search ads for "best electric scooter India"

Call to Action:
Book a free test ride today and switch to smart mobility.

(Note: Live AI response unavailable, showing demo output.)
""",
            "debug_error": str(e)
        }