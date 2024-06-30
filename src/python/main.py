from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib

app = FastAPI()

# Cấu hình CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Giả lập model (thay thế bằng model thật của bạn)
def predict_careers(mbti_type):
    # Đây chỉ là ví dụ, thay thế bằng logic dự đoán thực tế của bạn
    careers = {
        'ISTJ': ['Accountant', 'Lawyer', 'Judge'],
        'ISFJ': ['Nurse', 'Social Worker', 'Teacher'],
        'INFJ': ['Counselor', 'Writer', 'HR Manager'],
        'INTJ': ['Software Engineer', 'Data Scientist', 'Architect'],
        'ISTP': ['Mechanic', 'Electrician', 'Scientist'],
        'ISFP': ['Artist', 'Musician', 'Florist'],
        'INFP': ['Therapist', 'Environmental Activist', 'Writer'],
        'INTP': ['Researcher', 'Inventor', 'Programmer'],
        'ESTP': ['Entrepreneur', 'Sales Representative', 'Stockbroker'],
        'ESFP': ['Event Planner', 'Entertainer', 'Salesperson'],
        'ENFP': ['Marketing Manager', 'Public Relations Specialist', 'Teacher'],
        'ENTP': ['Consultant', 'Lawyer', 'Entrepreneur'],
        'ESTJ': ['Manager', 'Supervisor', 'Politician'],
        'ESFJ': ['HR Manager', 'Social Worker', 'Event Planner'],
        'ENFJ': ['Counselor', 'Teacher', 'Non-Profit Manager'],
        'ENTJ': ['CEO', 'Entrepreneur', 'Management Consultant']
       
    }
    return careers.get(mbti_type, ['No specific careers found'])

class MBTIInput(BaseModel):
    mbti_type: str

@app.post("/predict_career")
async def predict_career(input: MBTIInput):
    mbti_type = input.mbti_type.upper()
    predicted_careers = predict_careers(mbti_type)
    return {"predicted_careers": predicted_careers}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# import joblib
# import numpy as np

# app = FastAPI()

# # Cấu hình CORS
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Load model
# model = joblib.load('mbti_career_model.joblib')

# class MBTIInput(BaseModel):
#     mbti_type: str

# @app.post("/predict_career")
# async def predict_career(input: MBTIInput):
#     mbti_type = input.mbti_type.upper()
#     input_features = convert_mbti_to_features(mbti_type)
    
#     # Dự đoán sử dụng model
#     predicted_careers = model.predict([input_features])
    
#     # Chuyển đổi kết quả dự đoán thành danh sách nghề nghiệp
#     career_list = convert_prediction_to_careers(predicted_careers[0])
    
#     return {"predicted_careers": career_list}

# def convert_mbti_to_features(mbti_type):
#     # Chuyển đổi MBTI thành one-hot encoding
#     mbti_types = ['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP',
#                   'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ']
#     features = np.zeros(16)
#     features[mbti_types.index(mbti_type)] = 1
#     return features

# def convert_prediction_to_careers(prediction):
#     # Giả sử prediction là một mảng các xác suất cho mỗi nghề nghiệp
#     # careers = ['Bác sĩ', 'Kỹ sư', 'Giáo viên', 'Nhà thiết kế', 'Nhà quản lý', 'Nghệ sĩ']  # Thay thế bằng danh sách nghề nghiệp thực tế của bạn
#     careers = [
#     'Software Engineer', 'Data Scientist', 'Teacher', 'Doctor', 'Nurse',
#     'Accountant', 'Lawyer', 'Marketing Manager', 'Graphic Designer', 'Chef',
#     'Architect', 'Psychologist', 'Financial Analyst', 'HR Manager', 'Journalist',
#     'Entrepreneur', 'Sales Representative', 'Mechanical Engineer', 'Pharmacist', 'Dentist']
#     top_careers = sorted(zip(careers, prediction), key=lambda x: x[1], reverse=True)[:3]
#     return [career for career, _ in top_careers]

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)


