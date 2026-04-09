const companies = ["Google", "Amazon", "Figma", "Netflix", "Meta", "Microsoft", "Pinterest", "Slack", "Spotify", "Oracle", "Walmart"];

const jobCategory = [
    {
        "name": "Digital Marketing",
        "desc": "Promote brands online with marketing strategies",
        "jobs": "1k"
    },
    {
        "name": "Web Developer",
        "desc": "Build and maintain websites for clients",
        "jobs": "2k"
    },
    {
        "name": "Arts & Design",
        "desc": "Create visual content for branding and media",
        "jobs": "500"
    },
    {
        "name": "UI-UX Designer",
        "desc": "Design user interfaces and enhance user experience",
        "jobs": "800"
    },
    {
        "name": "Content Writing",
        "desc": "Write and edit content for various platforms",
        "jobs": "1.5"
    },
    {
        "name": "Data Entry",
        "desc": "Input data into systems accurately and efficiently",
        "jobs": "1"
    },
    {
        "name": "Customer Support",
        "desc": "Assist customers with inquiries and issues",
        "jobs": "1.2"
    },
    {
        "name": "Sales",
        "desc": "Sell products and services to customers",
        "jobs": "900"
    },
    {
        "name": "Finance",
        "desc": "Manage financial records and transactions",
        "jobs": "700"
    },
    {
        "name": "Human Resource",
        "desc": "Recruit, manage, and support company employees",
        "jobs": "600"
    }
]

const work = [
    {
        "name": "Build Your Resume",
        "desc": "Create a standout resume with your skills."
    },
    {
        "name": "Apply for Job",
        "desc": "Find and apply for jobs that match your skills."
    },
    {
        "name": "Get Hired",
        "desc": "Connect with employers and start your new job."
    }
]


const testimonials = [
    {
        "name": "Shivam Patel",
        "testimonial": "This job portal made job search easy and quick. Recommended to all job seekers!",
        "rating": 5
    },
    {
        "name": "Abhishek Kullu",
        "testimonial": "Found my dream job within a week! The application process was smooth.",
        "rating": 5
    },
    {
        "name": "Swapnil Pandey",
        "testimonial": "I secured a job offer within days of applying. Exceptional user experience and support.",
        "rating": 4
    },
    {
        "name": "Pavan Barnana",
        "testimonial": "Highly efficient job portal with excellent resources. Helped me land a great position.",
        "rating": 4
    }
]
const similar=[
{
  name: "Meta",
 employees: 58604
},
{
  name: "Netflix",
 employees: 12800
},
{
  name: "Microsoft",
 employees: 221000
},
{
  name: "Adobe",
 employees: 29439
},
{
  name: "Google",
 employees: 181798
},
{
  name: "Spotify",
 employees: 8200
},
{
  name: "Amazon",
 employees: 1561000
},
{
  name: "Apple",
 employees: 164000
}
]
const companyData={
    Name: "Google",
    Overview: "Google is a global leader in technology, specializing in internet-related services and products. Our mission is to organize the world’s information and make it universally accessible and useful. Founded by Larry Page and Sergey Brin, Google has grown into one of the most influential companies in the world, providing innovative tools and services that help billions of people across the globe.",
    Industry: "Internet, Software & Technology Services",
    Website: "https://www.google.com",
    Size: "100,000+ Employees",
    Headquarters: "Mountain View, California, United States",
    Specialties: [
      "Search Engine",
      "Online Advertising",
      "Cloud Computing",
      "Software",
      "Hardware",
      "AI & Machine Learning",
      "Mobile Operating Systems",
      "Consumer Electronics"
    ]
  }
 
const footerLinks = [
    { title: "Product", links: ["Find Job", "Find Company", "Find Employee"] },
    { title: "Company", links: ["About Us", "Contact Us", "Privacy Policy", "Terms & Conditions"] },
    { title: "Support", links: ["Help & Support", "Feedback", "FAQs"] }

]
export { similar,companyData,companies, jobCategory, work, testimonials, footerLinks };