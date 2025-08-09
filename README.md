
<img width="3188" height="1202" alt="frame (3)" src="https://github.com/user-attachments/assets/517ad8e9-ad22-457d-9538-a9e62d137cd7" />

# Objectify 

## Basic Details
### Team Name: Fall Guys

### Team Members
- Team Lead: V K Adithyan - Christ College of Engineering (Computer Science Department)
- Member 2: Aditya Sankar - Christ College of Engineering (Computer Science (Data Science) Department)

### Project Description
Objectify is a modern social media platform that transforms everyday objects into captivating stories using artificial intelligence. Users upload photos of any object, select an emotion or mood, and AI generates unique, engaging backstories that bring those objects to life. Think of it as "Instagram meets AI storytelling" for inanimate objects.

### The Problem (that doesn't exist)
Billions of objects exist around us — chairs, mugs, shoes — yet none of them get the fame they deserve. How many times have you looked at a stapler and thought, “I wonder what its life story is”? Exactly.

### The Solution (that nobody asked for)
Objectify finally gives voice to the silent heroes of our daily lives. Snap a picture, pick a mood, and our AI will spin a backstory so dramatic your coffee mug might just win an Oscar.

---

## Technical Details
### Technologies/Components Used

**Frontend**
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **File Upload:** React Dropzone
- **Image Optimization:** Next.js Image component

**Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** Express Validator
- **Security:** Helmet, CORS
- **File Upload:** Multer
- **Environment:** dotenv

**Database & Storage**
- **Database:** MongoDB Atlas (Cloud)
- **ODM:** Mongoose
- **Image Storage:** Cloudinary
- **Local Storage:** Browser localStorage (demo mode)

**AI & APIs**
- **AI Model:** OpenAI GPT-4 Vision API
- **Image Analysis:** GPT-4 Vision for object recognition
- **Story Generation:** GPT-4 for creative writing

**Development & Build**
- **Package Manager:** npm
- **Build Tool:** Next.js built-in bundler (Webpack)
- **TypeScript Compiler:** tsc
- **Linting:** ESLint (Next.js config)
- **CSS Processing:** PostCSS, Autoprefixer

---

## Implementation

### Prerequisites
- **Node.js** (v18+ recommended)
- **MongoDB Atlas** account and cluster
- **Cloudinary** account for image storage
- **OpenAI API Key** for GPT-4 Vision and story generation

---

### Installation

#### Clone the Repository
```bash
git clone https://github.com/yourusername/objectify.git
cd objectify
```

#### Frontend Setup
```bash
cd frontend
npm install
```
- Create `.env.local` with:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_DEMO_MODE=true
```

#### Backend Setup
```bash
cd backend
npm install
```
- Create `.env` with:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
OPENAI_API_KEY=your_openai_api_key
```

---

### Run Commands

**Development Mode**
```bash
# Terminal 1: Backend
cd backend && npm start

# Terminal 2: Frontend
cd frontend && npm run dev
```

**Production Build**
```bash
npm run build && npm start
```

---

### Quick Access
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Demo Mode:** No login required

---

## Project Documentation

### Screenshots

![Homepage](./screenshots/homepage.png)  
*The welcoming landing page of Objectify with options to try the demo or explore stories.*

![Upload Object](./screenshots/upload.png)  
*Step 1 of creating a post — upload your object’s image to bring it to life.*

![Generate Story](./screenshots/generate-story.png)  
*Step 3 — AI generates a magical backstory for the uploaded object based on the selected emotion.*

---

### Diagrams
<img width="1890" height="886" alt="Screenshot 2025-08-09 051240" src="https://github.com/user-attachments/assets/ff461a2d-d4c8-4f7e-9500-d55ea2a90667" />
<img width="1918" height="885" alt="Screenshot 2025-08-09 051258" src="https://github.com/user-attachments/assets/2087b57a-5121-4b1f-b662-f1c1f0aaf13f" />
<img width="1913" height="887" alt="Screenshot 2025-08-09 051333" src="https://github.com/user-attachments/assets/1fff01d7-d41f-4806-a278-5d2a3aa59348" />
<img width="1843" height="961" alt="Screenshot 2025-08-09 051355" src="https://github.com/user-attachments/assets/c9fd5c2d-690b-4a25-8022-122783482556" />
<img width="620" height="132" alt="Screenshot 2025-08-09 051406" src="https://github.com/user-attachments/assets/8a1d0598-0963-46e3-80c4-f12bff9eb551" />
<img width="1197" height="881" alt="Screenshot 2025-08-09 051429" src="https://github.com/user-attachments/assets/b287f453-02fe-4525-99ed-ae72d8e5b6de" />




---

## Team Contributions
- **V K Adithyan:** Backend API, AI integration, MongoDB schema design
- **Aditya Sankar:** Frontend UI, animations, image upload & optimization

---

Made with ❤️ at TinkerHub Useless Projects 



