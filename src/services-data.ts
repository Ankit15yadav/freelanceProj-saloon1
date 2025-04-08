export const servicesData = {
    men: [
        {
            name: "1. Hair Services",
            services: [
                {
                    name: "Standard Haircut",
                    price: "₹499",
                    subServices: [
                        { name: "Buzz Cut", price: null },
                        { name: "Classic Fade", price: null },
                        { name: "Basic Trim", price: null },
                    ],
                },
                {
                    name: "Advanced Haircut",
                    price: "₹599",
                    subServices: [
                        { name: "Bullet", price: null },
                        { name: "Fade", price: null },
                        { name: "Trape", price: null },
                        { name: "French Crop", price: null },
                    ],
                },
            ],
        },
        {
            name: "2. Hair Color",
            services: [
                {
                    name: "Majirel / INOA",
                    price: null,
                    subServices: [
                        { name: "Short Length", price: "₹1099 / ₹1199" },
                        { name: "Medium Length", price: "₹1299 / ₹1499" },
                        { name: "Add-on: Olaplex", price: "₹999" },
                    ],
                },
            ],
        },
        {
            name: "3. Beard Grooming",
            services: [
                { name: "Clean Shave", price: "₹250" },
                { name: "Advanced Clean Shave", price: "₹400" },
                { name: "Shaping", price: "₹350" },
                { name: "Advanced Shaping", price: "₹400" },
            ],
        },
        {
            name: "4. Hand & Foot Care",
            services: [
                { name: "Classic Pedicure (40 mins)", price: "₹700" },
                { name: "Classic Manicure (40 mins)", price: "Price on consultation" },
                { name: "Gel Spa Manicure (Raaga, 60 mins)", price: "Price on consultation" },
                { name: "Spa Pedicure (Raaga, 60 mins)", price: "₹1200" },
            ],
        },
        {
            name: "5. Hair Treatments",
            services: [
                { name: "Shine Booster Treatment", price: "₹999" },
                { name: "Smoothing", price: "Price on consultation" },
                { name: "Keratin", price: "Price on consultation" },
                { name: "Cysteine / QOD", price: "Price on consultation" },
                { name: "Botox", price: "Price on consultation" },
                { name: "Anti-Dandruff Treatment", price: "₹599" },
            ],
        },
        {
            name: "6. Facial & Skin Care",
            services: [
                {
                    name: "Facial Treatments (60 mins)",
                    price: null,
                    subServices: [
                        { name: "Whitening Facial", price: "₹1000" },
                        { name: "O2C2 Facial with Bleach", price: "₹2000" },
                        { name: "Advanced Facials (Raaga)", price: "₹2500" },
                        { name: "Advanced Facials with Bleach (Raaga)", price: "₹3000" },
                    ],
                },
                {
                    name: "Quick Facial Services (20 mins)",
                    price: null,
                    subServices: [
                        { name: "D-Tan", price: "₹700" },
                        { name: "Power Mask", price: "₹750" },
                    ],
                },
                {
                    name: "Clean-Ups (40 mins)",
                    price: null,
                    subServices: [
                        { name: "D-Tan Clean-Up (Raaga)", price: "₹1500" },
                        { name: "Whitening Clean-Up", price: "₹1000" },
                    ],
                },
            ],
        },
    ],
    women: [
        {
            name: "1. Haircut & Styling",
            services: [
                { name: "Haircut", price: "₹300" },
                { name: "Loreal Wash & Blast Dry", price: "₹500" },
                { name: "Fringe Cut", price: "₹800" },
                { name: "Senior Stylist", price: "₹999" },
                { name: "Haircut & Hair Wash", price: "₹500" },
                { name: "Split-End Remover Treatment", price: "₹700" },
                {
                    name: "Blow Dry",
                    price: null,
                    subServices: [
                        { name: "Short/Medium Hair", price: "₹700" },
                        { name: "Long/Extra Long Hair", price: "₹800" },
                    ],
                },
                {
                    name: "Ironing + Hair Wash",
                    price: null,
                    subServices: [
                        { name: "Short/Medium Hair", price: "₹600" },
                        { name: "Long/Extra Long Hair", price: "₹700" },
                    ],
                },
                { name: "Tongs / Iron Curls", price: "₹800" },
                {
                    name: "Loreal Wash & Blow Dry",
                    price: null,
                    subServices: [
                        { name: "Short/Medium Hair", price: "₹400" },
                        { name: "Long/Extra Long Hair", price: "₹500" },
                    ],
                },
            ],
        },
        {
            name: "2. Hair Coloring",
            services: [
                {
                    name: "Root Touch Up (Majirel / INOA)",
                    price: null,
                    subServices: [
                        { name: "Short Hair", price: "₹1000" },
                        { name: "Medium Hair", price: "₹1200" },
                        { name: "Long/Extra Long Hair", price: "₹1400" },
                    ],
                },
                {
                    name: "Global Color (Majirel / INOA)",
                    price: null,
                    subServices: [
                        { name: "Short/Medium Hair", price: "₹4500" },
                        { name: "Long/Extra Long Hair", price: "₹7000" },
                    ],
                },
                { name: "Hi-Lites", price: "₹8000" },
                { name: "Creative Color (Ombre / Balayage)", price: "₹3600 to ₹6000" },
                { name: "Crazy Color with Pre-Lightening", price: "₹5800 to ₹8800" },
                { name: "Per Streak", price: "₹500" },
            ],
        },
        {
            name: "3. Hair Treatments",
            services: [
                {
                    name: "Straightening / Smoothening",
                    price: null,
                    subServices: [
                        { name: "Short/Medium Hair", price: "₹5000" },
                        { name: "Long/Extra Long Hair", price: "₹7500" },
                    ],
                },
                { name: "Keratin", price: "₹6800 to ₹10000" },
                { name: "Cysteine / QOD", price: "₹7800+" },
                { name: "Hair Botox", price: "₹8800+" },
            ],
        },
        {
            name: "4. Hair Extensions",
            services: [
                { name: "Short Hair", price: "₹6999" },
                { name: "Medium Hair", price: "₹7999" },
                { name: "Long Hair", price: "₹8999" },
                { name: "Extra Long Hair", price: "₹9999" },
                { name: "Hair Extension Removal", price: "₹3000" },
                { name: "Hair Extension Wash", price: "₹2500" },
            ],
        },
        {
            name: "5. Scalp & Hair Care",
            services: [
                { name: "Loreal Absolut Repair Molecular", price: "₹2200" },
                { name: "Olaplex Standalone", price: "₹2000" },
                { name: "Fibre Clinix", price: "₹1500" },
                { name: "Risana Treatment", price: "₹1500" },
                { name: "Anti-Thinning", price: "₹1000" },
                { name: "Anti-Dandruff (with 2-in-1 Mask)", price: "₹800" },
                { name: "Anti-Dandruff (with Blow Dry)", price: "₹1500" },
                { name: "Hair Repair & Hydrate Booster", price: "₹1200" },
            ],
        },
        {
            name: "6. Hair Spa & Massage",
            services: [
                {
                    name: "Hair Spa (Loreal/Wella/Schwarzkopf)",
                    price: null,
                    subServices: [
                        { name: "Short/Medium Hair", price: "₹1500" },
                        { name: "Long/Extra Long Hair", price: "₹1700" },
                    ],
                },
                { name: "Head Massage (30 mins)", price: "₹500" },
                { name: "Hair Rituals (45 mins)", price: "₹1200" },
            ],
        },
        {
            name: "7. Threading",
            services: [
                { name: "Eyebrows", price: "₹50" },
                { name: "Upper Lip", price: "₹30" },
                { name: "Chin/Nose", price: "₹50" },
                { name: "Forehead", price: "₹100" },
                { name: "Cheeks", price: "₹100" },
                { name: "Sides & Jawline", price: "₹150" },
            ],
        },
        {
            name: "8. Manicure & Pedicure",
            services: [
                { name: "Classic Manicure (40 mins)", price: "Price on consultation" },
                { name: "Gel Spa Manicure (Raaga, 60 mins)", price: "Price on consultation" },
            ],
        },
    ],
}
