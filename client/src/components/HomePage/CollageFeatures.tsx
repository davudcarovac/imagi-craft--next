import Image from "next/image";
import { Check } from "lucide-react";
import stil1 from "./assets/stil1.jpg";
import stil2 from "./assets/stil2.jpg";
import stil3 from "./assets/stil3.jpg";

export default function CollageFeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 saira-font">
            Smart Collage Templates for
            <span className="text-[#1aac83]">
              {" "}
              Stories, Pins, Headers & Posters
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Skip the resizing — our collage templates are optimized for
            real-world uses like social posts, prints, and digital layouts.
          </p>
        </div>

        {/* Collage Content - Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side (Left) */}
          <div className="relative group">
            {/* Main Collage Example */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform group-hover:-rotate-1 transition duration-300">
              <video
                src="/collage-video-preview.mp4" // Zamijenite sa pravim URL-om
                autoPlay
                width={600}
                height={400}
                muted
                playsInline
                loop
                className="w-full h-auto"
              />
              {/* Decorative Elements */}
              {/* <div className="absolute -bottom-4 -right-4 bg-white p-2 rounded-lg shadow-lg">
               
              </div> */}
            </div>

            {/* Interactive Badge */}
            <div className="absolute -top-5 -left-5 bg-white px-4 py-2 rounded-full shadow-md flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              <span className="font-medium text-gray-800 saira-font">
                live preview
              </span>
            </div>
          </div>

          {/* Text Side (Right) */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-800">
              Transformišite obične fotografije u umetnička dela
            </h3>

            <ul className="space-y-4">
              {[
                "Automatic alignment and scaling of images",
                "+10 unique collage templates  ",
                "Changing the background color of the collage",
                "Border radius and gap adjustment",
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check color="#1aac83" />
                  <span className="text-lg text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <button className="bg-[#1aac83] hover:bg-[#1aac83] cursor-pointer text-white px-8 py-3 rounded-lg font-semibold text-lg transition duration-300 shadow-lg hover:shadow-xl">
                Try collage editor
              </button>
              {/* <p className="mt-3 text-gray-500 text-sm">
                Nije potrebna registracija - počnite odmah!
              </p> */}
            </div>
          </div>
        </div>

        {/* Additional Examples */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {[stil1, stil2, stil3].map((item, index) => (
            <div
              key={index}
              className="hover:shadow-lg transition cursor-pointer bg-transparent"
            >
              <Image
                src={item}
                alt={`Collage style ${item}`}
                className="bg-transparent"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
