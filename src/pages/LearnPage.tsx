
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen, Award } from 'lucide-react';

const courseCategories = [
  "Clinical Skills",
  "Leadership",
  "Specialty Training",
  "Continuing Education",
  "Certification Prep"
];

const courses = [
  {
    id: "1",
    title: "Advanced Wound Care Management",
    description: "Learn the latest techniques in wound assessment, cleaning, and dressing selection.",
    image: "https://images.unsplash.com/photo-1585421514284-efb74320d662?q=80&w=1770&auto=format&fit=crop",
    duration: "4 hours",
    category: "Clinical Skills",
    ceCredits: 4,
    featured: true
  },
  {
    id: "2",
    title: "Nursing Leadership in Crisis Situations",
    description: "Develop skills to lead healthcare teams effectively during emergencies and high-stress scenarios.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    duration: "6 hours",
    category: "Leadership",
    ceCredits: 6
  },
  {
    id: "3",
    title: "Pediatric Assessment Fundamentals",
    description: "Master the essential skills for assessing pediatric patients across different age groups.",
    image: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?q=80&w=183&auto=format&fit=crop",
    duration: "5 hours",
    category: "Specialty Training",
    ceCredits: 5
  },
  {
    id: "4",
    title: "Pharmacology Update for Nurses",
    description: "Stay current with the latest medications, interactions, and administration protocols.",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=2070&auto=format&fit=crop",
    duration: "8 hours",
    category: "Continuing Education",
    ceCredits: 8,
    featured: true
  },
  {
    id: "5",
    title: "NCLEX-RN Examination Preparation",
    description: "Comprehensive review and practice questions to prepare for the NCLEX-RN examination.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
    duration: "12 hours",
    category: "Certification Prep",
    ceCredits: 0
  },
  {
    id: "6",
    title: "IV Therapy and Central Line Management",
    description: "Develop expertise in intravenous therapy procedures and central line maintenance.",
    image: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?q=80&w=1974&auto=format&fit=crop",
    duration: "4 hours",
    category: "Clinical Skills",
    ceCredits: 4
  }
];

const LearnPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Professional Development Center</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Expand your knowledge and advance your nursing career with our curated courses, 
          continuing education units, and specialty training.
        </p>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Featured Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses
            .filter(course => course.featured)
            .map(course => (
              <Card key={course.id} className="overflow-hidden flex flex-col md:flex-row h-full">
                <div className="md:w-1/3">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="h-48 md:h-full w-full object-cover"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className="bg-nursing-primary hover:bg-nursing-secondary">{course.category}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-sm text-gray-700">
                      {course.ceCredits > 0 && (
                        <>
                          <Award className="h-4 w-4 mr-1 text-nursing-secondary" />
                          <span>{course.ceCredits} CE Credits</span>
                        </>
                      )}
                    </div>
                    <Button className="bg-nursing-primary hover:bg-nursing-secondary">
                      Start Course
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Course Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {courseCategories.map((category, index) => (
            <Button 
              key={index} 
              variant="outline" 
              className="justify-start"
            >
              <BookOpen className="h-4 w-4 mr-2 text-nursing-primary" />
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">All Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map(course => (
            <Card key={course.id} className="overflow-hidden flex flex-col h-full">
              <img 
                src={course.image} 
                alt={course.title} 
                className="h-48 w-full object-cover"
              />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="border-nursing-primary text-nursing-primary">
                      {course.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm">{course.description}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center text-sm text-gray-700">
                    {course.ceCredits > 0 && (
                      <>
                        <Award className="h-4 w-4 mr-1 text-nursing-secondary" />
                        <span>{course.ceCredits} CE Credits</span>
                      </>
                    )}
                  </div>
                  <Button variant="outline">View Details</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
