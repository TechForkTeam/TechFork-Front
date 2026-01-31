export const TAG_CATEGORY_MAP = {
  IOS: "iOS",
  ANDROID: "Android",
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  DATA_ENGINEERING: "Data_Engineering",
  DATA_SCIENCE: "Data_Science",
  DATABASE: "Database",
  AI_ML: "AI_ML",
  DEVOPS: "DevOps",
  CLOUD: "Cloud",
  SYSTEMS_OS: "Systems_OS",
  NETWORKING: "Networking",
  SECURITY: "Security",
  GAME_DEV: "Game_Dev",
  AR_VR_XR: "AR_VR_XR",
  EMBEDDED_IOT: "Embedded_IoT",
  BLOCKCHAIN_WEB3: "Blockchain_Web3",
  QA_TEST: "QA_Test",
  PRODUCT_UX: "Product_UX",
  ARCHITECTURE: "Architecture",
} as const;

export const TAG = [
  "iOS",
  "Android",
  "Frontend",
  "Backend",
  "Data Engineering",
  "Data Science",
  "Database",
  "AI/ML",
  "DevOps",
  "Cloud",
  "Systems/OS",
  "Networking",
  "Security",
  "Game Dev",
  "AR/VR/XR",
  "Embedded/IoT",
  "Blockchain/Web3",
  "QA/Test",
  "Product/UX",
  "Architecture",
];

export const TAG_MAP = {
  iOS: [
    { code: "SWIFT", label: "Swift" },
    { code: "SWIFTUI", label: "SwiftUI" },
    { code: "UIKIT", label: "UIKit" },
    { code: "XCODE", label: "Xcode" },
  ],

  Android: [
    { code: "KOTLIN", label: "Kotlin" },
    { code: "ANDROID_JAVA", label: "Java" },
    { code: "JETPACK_COMPOSE", label: "Jetpack Compose" },
    { code: "ANDROID_STUDIO", label: "Android Studio" },
  ],

  Frontend: [
    { code: "REACT", label: "React" },
    { code: "VUE_JS", label: "Vue.js" },
    { code: "ANGULAR", label: "Angular" },
    { code: "JAVASCRIPT", label: "JavaScript" },
    { code: "TYPESCRIPT", label: "TypeScript" },
  ],

  Backend: [
    { code: "JAVA", label: "Java" },
    { code: "SPRING", label: "Spring" },
    { code: "NODE_JS", label: "Node.js" },
    { code: "PYTHON", label: "Python" },
    { code: "DJANGO", label: "Django" },
  ],

  Data_Engineering: [
    { code: "APACHE_SPARK", label: "Apache Spark" },
    { code: "APACHE_KAFKA", label: "Apache Kafka" },
    { code: "AIRFLOW", label: "Airflow" },
    { code: "ETL", label: "ETL" },
  ],

  Data_Science: [
    { code: "DS_PYTHON", label: "Python" },
    { code: "PANDAS", label: "Pandas" },
    { code: "NUMPY", label: "NumPy" },
    { code: "JUPYTER", label: "Jupyter" },
    { code: "SQL", label: "SQL" },
  ],

  Database: [
    { code: "MYSQL", label: "MySQL" },
    { code: "POSTGRESQL", label: "PostgreSQL" },
    { code: "MONGODB", label: "MongoDB" },
    { code: "REDIS", label: "Redis" },
    { code: "ORACLE", label: "Oracle" },
  ],

  AI_ML: [
    { code: "TENSORFLOW", label: "TensorFlow" },
    { code: "PYTORCH", label: "PyTorch" },
    { code: "MACHINE_LEARNING", label: "Machine Learning" },
    { code: "DEEP_LEARNING", label: "Deep Learning" },
  ],

  DevOps: [
    { code: "DOCKER", label: "Docker" },
    { code: "KUBERNETES", label: "Kubernetes" },
    { code: "DEVOPS_AWS", label: "AWS" },
    { code: "CI_CD", label: "CI/CD" },
    { code: "JENKINS", label: "Jenkins" },
  ],

  Cloud: [
    { code: "AWS", label: "AWS" },
    { code: "AZURE", label: "Azure" },
    { code: "GCP", label: "GCP" },
    { code: "FIREBASE", label: "Firebase" },
  ],

  Systems_OS: [
    { code: "LINUX", label: "Linux" },
    { code: "UNIX", label: "Unix" },
    { code: "WINDOWS_SERVER", label: "Windows Server" },
    { code: "SYSTEM_PROGRAMMING", label: "시스템 프로그래밍" },
  ],

  Networking: [
    { code: "TCP_IP", label: "TCP/IP" },
    { code: "HTTP_HTTPS", label: "HTTP/HTTPS" },
    { code: "RESTFUL_API", label: "RESTful API" },
    { code: "WEBSOCKET", label: "WebSocket" },
  ],

  Security: [
    { code: "NETWORK_SECURITY", label: "네트워크 보안" },
    { code: "WEB_SECURITY", label: "웹 보안" },
    { code: "ENCRYPTION", label: "암호화" },
    { code: "AUTHENTICATION", label: "인증" },
  ],

  Game_Dev: [
    { code: "UNITY", label: "Unity" },
    { code: "UNREAL_ENGINE", label: "Unreal Engine" },
    { code: "GAME_CSHARP", label: "C#" },
    { code: "GAME_CPP", label: "C++" },
  ],

  AR_VR_XR: [
    { code: "ARKIT", label: "ARKit" },
    { code: "REALITYKIT", label: "RealityKit" },
    { code: "UNITY_AR", label: "Unity AR" },
    { code: "VR_DEVELOPMENT", label: "VR Development" },
  ],

  Embedded_IoT: [
    { code: "C", label: "C" },
    { code: "CPP", label: "C++" },
    { code: "ARDUINO", label: "Arduino" },
    { code: "RASPBERRY_PI", label: "Raspberry Pi" },
    { code: "RTOS", label: "RTOS" },
  ],

  Blockchain_Web3: [
    { code: "ETHEREUM", label: "이더리움" },
    { code: "SMART_CONTRACT", label: "스마트 컨트랙트" },
    { code: "SOLIDITY", label: "Solidity" },
    { code: "WEB3", label: "Web3" },
    { code: "BLOCKCHAIN_BASICS", label: "블록체인 기초" },
    { code: "DAPP", label: "DApp" },
    { code: "NFT", label: "NFT" },
    { code: "CRYPTOCURRENCY", label: "암호화폐" },
  ],

  QA_Test: [
    { code: "JUNIT", label: "JUnit" },
    { code: "SELENIUM", label: "Selenium" },
    { code: "TEST_AUTOMATION", label: "Test Automation" },
    { code: "TDD", label: "TDD" },
  ],

  Product_UX: [
    { code: "FIGMA", label: "Figma" },
    { code: "SKETCH", label: "Sketch" },
    { code: "ADOBE_XD", label: "Adobe XD" },
    { code: "PROTOTYPING", label: "프로토타이핑" },
  ],

  Architecture: [
    { code: "MICROSERVICES", label: "Microservices" },
    { code: "DDD", label: "DDD" },
    { code: "DESIGN_PATTERNS", label: "Design Patterns" },
    { code: "CLEAN_ARCHITECTURE", label: "Clean Architecture" },
  ],
} as const;
