import os
import django
from datetime import date

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'election_backend.settings')
django.setup()

from api.models import State, Party, StatePartyMapping, Event, Faq

def seed_data():
    print("Performing Clean Sync of Election Intelligence Database (Django Port)...")
    
    # 1. CLEAR OLD DYNAMICS
    StatePartyMapping.objects.all().delete()
    State.objects.all().delete()
    Party.objects.all().delete()
    Event.objects.all().delete()
    Faq.objects.all().delete()
    
    # 2. CREATE PARTIES
    parties = {
        "BJP": Party.objects.create(name="BJP", leader="J.P. Nadda", symbol="Lotus", description="National Party (Ruling)"),
        "INC": Party.objects.create(name="INC", leader="Mallikarjun Kharge", symbol="Hand", description="National Party (Opposition)"),
        "AAP": Party.objects.create(name="AAP", leader="Arvind Kejriwal", symbol="Broom", description="National Party"),
        "TMC": Party.objects.create(name="TMC", leader="Mamata Banerjee", symbol="Flowers", description="Regional Power (Bengal)"),
        "SHS": Party.objects.create(name="SHS", leader="Eknath Shinde", symbol="Bow and Arrow", description="Regional Power (Maharashtra)"),
        "DMK": Party.objects.create(name="DMK", leader="M.K. Stalin", symbol="Rising Sun", description="Regional Power (Tamil Nadu)"),
    }
    
    # 3. CREATE STATES
    def create_state(name, cap, ls, vs, rs, cm, dcm):
        return State.objects.create(
            state_name=name, capital=cap, election_hq=cap,
            lok_sabha_seats=ls, vidhan_sabha_seats=vs, rajya_sabha_seats=rs,
            current_cm=cm, current_deputy_cm=dcm
        )
        
    states = {
        "Maharashtra": create_state("Maharashtra", "Mumbai", 48, 288, 19, "Devendra Fadnavis", "Eknath Shinde"),
        "Uttar Pradesh": create_state("Uttar Pradesh", "Lucknow", 80, 403, 31, "Yogi Adityanath", "Keshav Prasad Maurya"),
        "West Bengal": create_state("West Bengal", "Kolkata", 42, 294, 16, "Mamata Banerjee", "N/A"),
        "Gujarat": create_state("Gujarat", "Gandhinagar", 26, 182, 11, "Bhupendrabhai Patel", "N/A"),
        "Delhi": create_state("Delhi", "New Delhi", 7, 70, 3, "Atishi Marlena", "N/A"),
        "Tamil Nadu": create_state("Tamil Nadu", "Chennai", 39, 234, 18, "M. K. Stalin", "Udhayanidhi Stalin"),
        "Bihar": create_state("Bihar", "Patna", 40, 243, 16, "Nitish Kumar", "Samrat Choudhary"),
        "Rajasthan": create_state("Rajasthan", "Jaipur", 25, 200, 10, "Bhajan Lal Sharma", "Diya Kumari"),
        "Punjab": create_state("Punjab", "Chandigarh", 13, 117, 7, "Bhagwant Mann", "N/A"),
        "Assam": create_state("Assam", "Dispur", 14, 126, 7, "Himanta Biswa Sarma", "N/A"),
        "Kerala": create_state("Kerala", "Thiruvananthapuram", 20, 140, 9, "Pinarayi Vijayan", "N/A"),
        "Odisha": create_state("Odisha", "Bhubaneswar", 21, 147, 10, "Mohan Charan Majhi", "K.V. Singh Deo"),
        "Andhra Pradesh": create_state("Andhra Pradesh", "Amaravati", 25, 175, 11, "N. Chandrababu Naidu", "Pawan Kalyan"),
        "Telangana": create_state("Telangana", "Hyderabad", 17, 119, 7, "A. Revanth Reddy", "Mallu Bhatti Vikramarka"),
        "Karnataka": create_state("Karnataka", "Bengaluru", 28, 224, 12, "Siddaramaiah", "D. K. Shivakumar"),
        "Madhya Pradesh": create_state("Madhya Pradesh", "Bhopal", 29, 230, 11, "Mohan Yadav", "Rajendra Shukla"),
        "Chhattisgarh": create_state("Chhattisgarh", "Raipur", 11, 90, 5, "Vishnu Deo Sai", "Arun Sao"),
        "Jharkhand": create_state("Jharkhand", "Ranchi", 14, 81, 6, "Hemant Soren", "N/A"),
        "Haryana": create_state("Haryana", "Chandigarh", 10, 90, 5, "Nayab Singh Saini", "N/A"),
        "Himachal Pradesh": create_state("Himachal Pradesh", "Shimla", 4, 68, 3, "Sukhvinder Singh Sukhu", "Mukesh Agnihotri"),
        "Uttarakhand": create_state("Uttarakhand", "Dehradun", 5, 70, 3, "Pushkar Singh Dhami", "N/A"),
        "Goa": create_state("Goa", "Panaji", 2, 40, 1, "Pramod Sawant", "N/A"),
        "Tripura": create_state("Tripura", "Agartala", 2, 60, 1, "Manik Saha", "Jishnu Dev Varma"),
        "Meghalaya": create_state("Meghalaya", "Shillong", 2, 60, 1, "Conrad Sangma", "Prestone Tynsong"),
        "Manipur": create_state("Manipur", "Imphal", 2, 60, 1, "N. Biren Singh", "N/A"),
        "Nagaland": create_state("Nagaland", "Kohima", 1, 60, 1, "Neiphiu Rio", "T. R. Zeliang"),
        "Arunachal Pradesh": create_state("Arunachal Pradesh", "Itanagar", 2, 60, 1, "Pema Khandu", "Chowna Mein"),
        "Mizoram": create_state("Mizoram", "Aizawl", 1, 40, 1, "Lalduhoma", "N/A"),
        "Sikkim": create_state("Sikkim", "Gangtok", 1, 32, 1, "Prem Singh Tamang", "N/A"),
        "Jammu and Kashmir": create_state("Jammu and Kashmir", "Srinagar", 5, 90, 4, "Omar Abdullah", "Surinder Kumar Choudhary"),
    }
    
    # 4. CREATE MAPPINGS
    def create_mapping(s, p, lvl):
        StatePartyMapping.objects.create(state=s, party=p, influence_level=lvl)
        
    create_mapping(states["West Bengal"], parties["TMC"], "Ruling")
    create_mapping(states["Gujarat"], parties["BJP"], "Ruling")
    create_mapping(states["Maharashtra"], parties["SHS"], "Ruling")
    create_mapping(states["Delhi"], parties["AAP"], "Ruling")
    create_mapping(states["Tamil Nadu"], parties["DMK"], "Ruling")
    create_mapping(states["Bihar"], parties["BJP"], "Ruling Alliance")
    create_mapping(states["Rajasthan"], parties["BJP"], "Ruling")
    create_mapping(states["Punjab"], parties["AAP"], "Ruling")
    
    # 5. CREATE NEWS
    Event.objects.create(title="National Security Alert", description="Forces on high alert across sensitive zones.", event_type="Urgent")
    Event.objects.create(title="Electoral Roll Update", description="Final voter list published for upcoming assembly polls.", event_type="Live")
    
    # 6. CREATE FAQS
    Faq.objects.create(question="How do I vote?", answer="To vote, you must be 18+ and have your name on the electoral roll. Visit your polling booth with a valid ID.", keywords="vote,how,process,cast")
    Faq.objects.create(question="What ID do I need?", answer="You can use your Voter ID (EPIC), Aadhaar card, PAN card, Driving License, or Passport.", keywords="id,document,aadhaar,pan,proof")
    Faq.objects.create(question="How do I check my name in the voter list?", answer="You can verify your name on the official NVSP portal or the Voter Helpline App.", keywords="list,name,check,verify,nvsp")
    Faq.objects.create(question="What is a State's statistics?", answer="You can click on any state on the Interactive Map to see its CM, seat counts, and ruling parties.", keywords="state,statistics,stats,cm,party,map")
    Faq.objects.create(question="Who won the last election?", answer="Election results vary by state. Click on a specific state on the map to see the current ruling party.", keywords="won,win,result,ruling")
    
    print("Django DB Seeding Complete!")

if __name__ == '__main__':
    seed_data()
