🔐 Authentication Feature — Frontend Task
🎯 Objective
تنفيذ Authentication Module كامل باستخدام الـ architecture الموجودة في المشروع، ويشمل:
- Sign Up
- Sign In
- Logout
- Auth State
- Protected Routes
- Loading / Error / Success states
مع الالتزام بالـ Design System + Modularity + Clean Code + Reusability.
🏗️ Architecture
src/
└── features/
    └── auth/
        ├── components/
        │   ├── SignInForm.jsx
        │   ├── SignUpForm.jsx
        │   └── PasswordInput.jsx
        │
        ├── hooks/
        │   └── useAuth.js
        │
        ├── services/
        │   └── auth.service.js
        │
        ├── schemas/
        │   └── auth.schema.js
        │
        ├── pages/
        │   ├── SignIn.jsx
        │   └── SignUp.jsx
        │
        └── context/
            └── AuthContext.jsx

مهم: الـ structure دي reference؛ لو الـ project architecture الحالية بتفرض مكان مختلف، تتبع الـ architecture الموجودة بدل ما تعمل structure جديدة لمجرد الشكل.

🧩 المطلوب استخدامها
UI
- shadcn/ui
- Design Tokens الموجودة في المشروع
- Responsive design
- Accessibility
State
- useContext

- useState للحالات المحلية البسيطة
Forms
- React Hook Form
- الـ validation library الموجودة في المشروع، مثل Zod لو مستخدمة
React Hooks
لازم تفهم وتستخدم عند الحاجة:
useState
useEffect
useContext

لكن: ممنوع استخدام Hook لمجرد استخدامه. كل Hook لازم يكون له سبب واضح.
🔄 Data Flow
              AuthContext
                  │
          ┌───────┴───────┐
          ↓               ↓
      Sign In          Sign Up
          │               │
          └───────┬───────┘
                  ↓
             React Hook Form
                  ↓
              Validation
                  ↓
             auth.service
                  ↓
                 API
                  ↓
            AuthContext
                  ↓
        authenticated user
                  ↓
          Protected Routes

📚 مطلوب تذاكر قبل التنفيذ
1. React Context
   - createContext
   - useContext
   - Provider
   - Global state
2. React Hooks
   - useState
   - useEffect
  
   - إمتى نستخدم كل واحد وإمتى لأ
3. React Hook Form
   - register
   - handleSubmit
   - formState
   - errors
   - controlled/uncontrolled inputs
4. Form Validation
   - Schema validation
   - Field errors
   - Cross-field validation مثل Confirm Password
5. shadcn/ui
   - Form
   - Input
   - Button
   - Label
   - Alert / Dialog حسب الحاجة
   - Loading states
6. React Router
   - Protected Routes
   - Navigate / redirect
   - Auth guards
7. Frontend Architecture
   - Feature-based structure
   - Separation of concerns
   - Service layer
   - Reusable components
   - Custom hooks
✅ Requirements
Sign Up
 ├── Name
 ├── Email
 ├── Password
 ├── Confirm Password
 ├── Validation
 ├── Loading
 ├── API errors
 └── Success handling

Sign In
 ├── Email
 ├── Password
 ├── Show/Hide Password
 ├── Validation
 ├── Loading
 ├── API errors
 └── Success → Protected Area

Auth
 ├── currentUser
 ├── isAuthenticated
 ├── isLoading
 ├── login()
 ├── logout()
 └── auth initialization

🧱 Modularity Rules
- الـ UI components مش مسؤولة عن API calls.
- الـ API calls داخل auth.service.
- الـ Auth state داخل AuthContext.
- الـ reusable logic داخل hooks.
- الـ validation منفصلة عن الـ UI.
- استخدام components الموجودة في shadcn/ui بدل إعادة اختراعها.
- ممنوع duplicate logic بين Sign In و Sign Up.
- ممنوع component ضخمة تعمل كل حاجة.
- ممنوع over-engineering أو abstractions بدون احتياج.
- كل ملف يكون له responsibility واضحة.
🧪 Testing
تعمل tests للـ critical flows:
Sign Up
 ├── validation
 ├── successful registration
 └── API error

Sign In
 ├── validation
 ├── successful login
 ├── wrong credentials
 └── loading state

Auth
 ├── authenticated state
 ├── logout
 └── protected route

🚫 Code Quality
الكود لازم يكون:
Readable → Simple → Modular → Reusable → Testable
وممنوع:
❌ AI-looking abstractions
❌ unnecessary comments
❌ unnecessary hooks
❌ unnecessary files
❌ duplicated code
❌ hardcoded UI values
❌ API calls inside JSX components
❌ copy/paste implementation

وفي الـ PR لازم تكون قادرة تشرح كل architectural decision عملته وليه.