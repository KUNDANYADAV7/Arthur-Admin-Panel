import React, { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast"; // Importing from react-hot-toast
import emailjs from "emailjs-com";
import axios from "axios";

const Contact: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.email.trim()) newErrors.email = "Email is required";
    if (!formState.subject.trim()) newErrors.subject = "Subject is required";
    if (!formState.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEmail = async (email: string) => {
    try {
      const response = await axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${import.meta.env.VITE_EMAIL_VALID_API_KEY}&email=${email}`
      );
      return response.data.deliverability === "DELIVERABLE";
    } catch (error) {
      console.error("Email validation failed:", error);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const isValid = await validateEmail(formState.email);
    if (!isValid) {
      toast.error("The email address appears to be invalid or non-existent.", {
        duration: 4000,
      });
      setIsSubmitting(false);
      return;
    }

    const serviceID = import.meta.env.VITE_CONTACT_SERVICE_ID;
    const templateID = import.meta.env.VITE_CONTACT_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_CONTACT_PUBLIC_KEY;

    const templateParams = {
      from_name: formState.name,
      from_email: formState.email,
      subject: formState.subject,
      message: formState.message,
      to_name: "Arthur",
      reply_to: formState.email,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      toast.success("Thank you for contacting us. We'll respond soon.", {
        duration: 4000,
      });
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message. Please try again later.", {
        duration: 4000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
<div className="min-h-screen pt-24 pb-16">
  <div className="container mx-auto px-4">
    <div className="mb-12 text-center">
      <h1 className="text-4xl font-bold text-pesto-brown mb-4">Contact Us</h1>
      <p className="text-muted-foreground max-w-2xl mx-auto">
        Have questions, feedback, or want to place a large order? Get in touch with our team.
      </p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
      {/* Contact Information */}
      <div>
        <div className="bg-pesto-cream/30 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-pesto-brown mb-6">Get In Touch</h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-white p-3 rounded-full mr-4">
                <MapPin className="text-pesto-orange" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-pesto-brown mb-1">Our Location</h3>
                <p className="text-muted-foreground">
                  143 George St Unit 102<br />Arthur, ON N0G 1A0
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-white p-3 rounded-full mr-4">
                <Phone className="text-pesto-orange" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-pesto-brown mb-1">Phone Number</h3>
                <p className="text-muted-foreground">
                  <a href="tel:+15551234567" className="hover:text-pesto-orange">
                    +1 555-123-4567
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-white p-3 rounded-full mr-4">
                <Mail className="text-pesto-orange" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-pesto-brown mb-1">Email Address</h3>
                <p className="text-muted-foreground">info@yourcompany.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-white p-3 rounded-full mr-4">
                <Clock className="text-pesto-orange" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-pesto-brown mb-1">Business Hours</h3>
                <p className="text-muted-foreground">Mon - Fri: 9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-8 rounded-2xl overflow-hidden h-80 bg-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.146140222521!2d-80.53708329999999!3d43.832067699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bc7fdf8056bd7%3A0xd9a9192785330e3d!2sArthur%20Sandwich%20House!5e0!3m2!1sen!2sin!4v1744107893535!5m2!1sen!2sin"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
            title="Restaurant Location"
          ></iframe>
        </div>
      </div>

      {/* Contact Form */}
      <div>
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-2xl font-bold text-pesto-brown mb-6">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-pesto-brown mb-1">
                Your Name
              </label>
              <Input
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-pesto-brown mb-1">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                required
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-pesto-brown mb-1">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                placeholder="How can we help you?"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-pesto-brown mb-1">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder="Your message here..."
                rows={5}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Contact;
