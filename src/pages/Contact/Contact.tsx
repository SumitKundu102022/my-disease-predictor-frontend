import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Mail, Phone, MapPin, Send, Loader } from "lucide-react"; // Icons for contact info
import  Button  from "@components/ui/Button"; // Assuming you have a Button component
import Input  from "@components/ui/Input"; // Assuming you have an Input component
import { useLoading } from "@/contexts/LoadingContext";

const ContactPage = () => {
  const { setIsLoadingRoute } = useLoading(); // Use the loading context

  useEffect(() => {
    // When this component mounts, it means the page content is loaded
    setIsLoadingRoute(false);
  }, [setIsLoadingRoute]); // Dependency array includes setIsLoadingRoute
    
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // 'idle', 'sending', 'sent', 'error'

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // In a real application, you would send this data to your backend API
    // For now, we'll simulate an API call
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate success or failure
      const success = Math.random() > 0.2; // 80% chance of success

      if (success) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" }); // Clear form
      } else {
        throw new Error("Failed to send message. Please try again.");
      }
    } catch (error: any) {
      console.error("Contact form submission error:", error);
      setStatus("error");
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const formItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-12 px-4 sm:px-6 lg:px-8 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg"
      >
        Contact Us
      </motion.h1>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8 max-w-4xl text-gray-800 space-y-8"
      >
        <h2 className="text-3xl font-semibold text-gray-900">Get in Touch</h2>
        <p className="text-lg leading-relaxed">
          Have questions, feedback, or need support? We'd love to hear from you!
          Reach out to us through the following channels or fill out the form
          below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            variants={formItemVariants}
            className="flex flex-col items-center space-y-2"
          >
            <Mail className="w-10 h-10 text-blue-600" />
            <span className="font-semibold">Email Us</span>
            <a
              href="mailto:info@mediscan.com"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              info@mediscan.com
            </a>
          </motion.div>
          <motion.div
            variants={formItemVariants}
            className="flex flex-col items-center space-y-2"
          >
            <Phone className="w-10 h-10 text-green-600" />
            <span className="font-semibold">Call Us</span>
            <a
              href="tel:+1234567890"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              +1 (234) 567-890
            </a>
          </motion.div>
          <motion.div
            variants={formItemVariants}
            className="flex flex-col items-center space-y-2"
          >
            <MapPin className="w-10 h-10 text-red-600" />
            <span className="font-semibold">Visit Us</span>
            <p className="text-gray-700">
              123 AI Street, Health City, CA 90210
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-8 max-w-2xl w-full text-gray-800 space-y-6"
      >
        <h2 className="text-3xl font-semibold text-gray-900">
          Send Us a Message
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div variants={formItemVariants}>
            <label
              htmlFor="name"
              className="block text-left text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>
          <motion.div variants={formItemVariants} transition={{ delay: 0.1 }}>
            <label
              htmlFor="email"
              className="block text-left text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>
          <motion.div variants={formItemVariants} transition={{ delay: 0.2 }}>
            <label
              htmlFor="message"
              className="block text-left text-gray-700 text-sm font-bold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </motion.div>
          <motion.div variants={formItemVariants} transition={{ delay: 0.3 }}>
            <Button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2"
            >
              {status === "sending" ? (
                <>
                  <Loader className="animate-spin w-5 h-5" /> Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" /> Send Message
                </>
              )}
            </Button>
          </motion.div>

          {status === "sent" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-600 mt-4"
            >
              Message sent successfully! We'll get back to you soon.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 mt-4"
            >
              Failed to send message. Please try again later.
            </motion.p>
          )}
        </form>
      </motion.section>
    </div>
  );
};

export default ContactPage;
