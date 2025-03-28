<!-- AboutUs.vue -->
<template>
    <div class="about-page">
        <!-- Header Section -->
        <section class="py-16 bg-gradient-to-r from-purple-50 to-purple-100">
            <div class="container mx-auto px-4">
                <h1 class="text-4xl font-bold text-purple-900">About Us</h1>
                <p class="mt-4 text-xl max-w-2xl text-purple-800">Discover our story, our mission, and the team behind
                    our success.</p>
            </div>
        </section>

        <!-- Our Story Section -->
        <section class="container mx-auto px-4 py-16">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 class="text-3xl font-semibold mb-6 text-purple-900">Our Story</h2>
                    <Transition appear enter-from-class="opacity-0 -translate-x-6"
                        enter-active-class="transition-all duration-1000 ease-out">
                        <div class="prose max-w-none text-gray-700">
                            <p class="mb-4">Founded in 2015, our company began with a simple vision: to create
                                innovative
                                solutions that make a difference in people's lives.</p>
                            <p class="mb-4">What started as a small team of passionate individuals has grown into a
                                thriving
                                organization dedicated to excellence and customer satisfaction.</p>
                            <p>Through years of hard work, dedication, and a commitment to our core values, we've
                                established ourselves as industry leaders known for quality and reliability.</p>
                        </div>
                    </Transition>
                </div>

                <Transition appear enter-from-class="opacity-0 translate-x-6"
                    enter-active-class="transition-all duration-1000 ease-out">
                    <div class="bg-gray-200 rounded-lg overflow-hidden">
                        <!-- Replace with actual image -->
                        <img src="/assets/images/company-founding.jpg" class="h-80 object-cover" alt="" srcset="">
                    </div>
                </Transition>
            </div>
        </section>

        <!-- Mission & Values Section -->
        <section class="py-16 bg-purple-50">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-semibold mb-12 text-center text-purple-900">Our Mission & Values</h2>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Mission -->
                    <Transition appear enter-from-class="opacity-0 -translate-x-6"
                        enter-active-class="transition-all duration-1000 ease-out">
                        <div class="bg-white p-8 rounded-lg shadow-md">
                            <div class="mb-4 text-purple-700">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 class="text-xl font-semibold mb-3 text-purple-900">Our Mission</h3>
                            <p class="text-gray-700">To deliver exceptional products and services that empower our
                                customers
                                to achieve their goals, while making a positive impact on communities around us.</p>
                        </div>
                    </Transition>

                    <!-- Vision -->
                    <div class="bg-white p-8 rounded-lg shadow-md">
                        <div class="mb-4 text-purple-700">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold mb-3 text-purple-900">Our Vision</h3>
                        <p class="text-gray-700">To be recognized as the industry leader that consistently exceeds
                            expectations, fosters innovation, and inspires positive change in all that we do.</p>
                    </div>

                    <Transition appear enter-from-class="opacity-0 translate-x-6"
                        enter-active-class="transition-all duration-1000 ease-out">
                        <!-- Values -->
                        <div class="bg-white p-8 rounded-lg shadow-md">
                            <div class="mb-4 text-purple-700">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 class="text-xl font-semibold mb-3 text-purple-900">Our Values</h3>
                            <p class="text-gray-700">Integrity, excellence, innovation, collaboration, and
                                customer-centricity form the foundation of everything we do.</p>
                        </div>
                    </Transition>
                </div>
            </div>
        </section>

        <!-- Team Section -->
        <section class="container mx-auto px-4 py-16">
            <h2 class="text-3xl font-semibold mb-12 text-center text-purple-900">Meet Our Team</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Team Member 1 -->
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="h-64 bg-gray-300">
                        <!-- Replace with actual image -->
                        <img src="@/assets/images/team/Chagi_Siyavuya.jpeg" class="w-full h-full object-cover"
                            alt="Profile Image">
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-purple-900">Chagi Siyavuya</h3>
                        <p class="text-purple-700 mb-3">CEO & Founder</p>
                        <p class="text-gray-700 mb-4">
                            A Full-Stack developer with over 4 years of experience in Windows, Web, Android development,
                            and Cloud Computing.
                            Specializes in developing web applications using the latest technologies.
                        </p>
                        <div class="flex space-x-3">
                            <!-- Github -->
                            <a href="https://github.com/siyavuyachagi" target="_blank"
                                class="text-gray-800 hover:text-gray-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>

                            <!-- Facebook -->
                            <a href="https://web.facebook.com/syavuyachagi" target="_blank"
                                class="text-blue-600 hover:text-blue-800 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.738-.9 10.126-5.864 10.126-11.854z" />
                                </svg>
                            </a>

                            <!-- LinkedIn -->
                            <a href="https://www.linkedin.com/in/siyavuyachagi/" target="_blank"
                                class="text-blue-700 hover:text-blue-900 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>

                            <!-- X (formerly Twitter) -->
                            <a href="https://x.com/siyavuya_chagi" target="_blank"
                                class="text-gray-800 hover:text-gray-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                                </svg>
                            </a>

                            <!-- YouTube -->
                            <a href="https://www.youtube.com/@siyavuyachagi" target="_blank"
                                class="text-red-600 hover:text-red-800 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </a>

                            <!-- TikTok -->
                            <a href="https://www.tiktok.com/@siyavuyachagi" target="_blank"
                                class="text-gray-800 hover:text-gray-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Team Member 2 -->
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="h-64 bg-gray-300">
                        <!-- Replace with actual image -->
                        <div class="w-full h-full flex items-center justify-center">
                            <p class="text-gray-600">Photo</p>
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-purple-900">John Smith</h3>
                        <p class="text-purple-700 mb-3">UI/UX Designer</p>
                        <p class="text-gray-700 mb-4">
                            With a keen eye for detail and a user-centered approach, Sarah crafts intuitive and visually
                            engaging designs that enhance user experiences.
                        </p>
                        <div class="flex space-x-3">
                            <!-- LinkedIn -->
                            <a href="#" class="text-blue-700 hover:text-blue-900 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            <!-- X (formerly Twitter) -->
                            <a href="#" class="text-gray-800 hover:text-gray-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Team Member 3 -->
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="h-64 bg-gray-300">
                        <!-- Replace with actual image -->
                        <div class="w-full h-full flex items-center justify-center">
                            <p class="text-gray-600">Photo</p>
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-purple-900">Sarah Johnson</h3>
                        <p class="text-purple-700 mb-3">Front-End Developer</p>
                        <p class="text-gray-700 mb-4">
                            Passionate about creating responsive and visually appealing web applications, Sarah
                            specializes in building seamless user interfaces with modern front-end technologies.
                        </p>
                        <div class="flex space-x-3">
                            <!-- Facebook -->
                            <a href="#" class="text-blue-600 hover:text-blue-800 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.738-.9 10.126-5.864 10.126-11.854z" />
                                </svg>
                            </a>

                            <!-- LinkedIn -->
                            <a href="#" class="text-blue-700 hover:text-blue-900 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Team Member 4 -->
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="h-64 bg-gray-300">
                        <!-- Replace with actual image -->
                        <div class="w-full h-full flex items-center justify-center">
                            <p class="text-gray-600">Photo</p>
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-purple-900">Michael Brown</h3>
                        <p class="text-purple-700 mb-3">Graphic Designer</p>
                        <p class="text-gray-700 mb-4">
                            A creative mind with a strong eye for detail, Michael brings brand identities to life
                            through innovative designs, ensuring visually captivating and cohesive graphics for all
                            media.
                        </p>
                        <div class="flex space-x-3">
                            <!-- Instagram -->
                            <a href="#" class="text-pink-600 hover:text-pink-800 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>

                            <!-- Facebook -->
                            <a href="#" class="text-blue-600 hover:text-blue-800 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.738-.9 10.126-5.864 10.126-11.854z" />
                                </svg>
                            </a>

                            <!-- LinkedIn -->
                            <a href="#" class="text-blue-700 hover:text-blue-900 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Stats Section -->
        <section class="py-16 bg-purple-900 text-white">
            <div class="container mx-auto px-4">
                <h2 class="text-3xl font-semibold mb-12 text-center">Our Impact</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <!-- Stat 1 -->
                    <div class="text-center">
                        <div class="text-5xl font-bold mb-2">10+</div>
                        <p class="text-xl text-purple-200">Years of Experience</p>
                    </div>

                    <!-- Stat 2 -->
                    <div class="text-center">
                        <div class="text-5xl font-bold mb-2">500+</div>
                        <p class="text-xl text-purple-200">Happy Clients</p>
                    </div>

                    <!-- Stat 3 -->
                    <div class="text-center">
                        <div class="text-5xl font-bold mb-2">50+</div>
                        <p class="text-xl text-purple-200">Team Members</p>
                    </div>

                    <!-- Stat 4 -->
                    <div class="text-center">
                        <div class="text-5xl font-bold mb-2">100+</div>
                        <p class="text-xl text-purple-200">Projects Completed</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials Section -->
        <section class="container mx-auto px-4 py-16">
            <h2 class="text-3xl font-semibold mb-12 text-center text-purple-900">What Our Clients Say</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Testimonial 1 -->
                <div class="bg-white p-8 rounded-lg shadow-md">
                    <div class="text-purple-600 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                    </div>
                    <p class="text-gray-700 mb-6">Working with this company has been an absolute pleasure. Their
                        attention to detail and commitment to quality is unmatched. I highly recommend their services.
                    </p>
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                            <img :src="`https://randomuser.me/api/portraits/${['men', 'women'][Math.floor(Math.random() * 2)]}/${Math.floor(Math.random() * 100)}.jpg`"
                                alt="Random Person" class="w-full h-full object-cover">
                        </div>
                        <div>
                            <h4 class="font-semibold text-purple-900">Robert Johnson</h4>
                            <p class="text-gray-600">CEO, Example Corp</p>
                        </div>
                    </div>
                </div>

                <!-- Testimonial 2 -->
                <div class="bg-white p-8 rounded-lg shadow-md">
                    <div class="text-purple-600 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                    </div>
                    <p class="text-gray-700 mb-6">The team's expertise and professionalism exceeded our expectations.
                        They delivered our project on time and within budget. We couldn't be happier with the results.
                    </p>
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                            <img :src="`https://randomuser.me/api/portraits/${['men', 'women'][Math.floor(Math.random() * 2)]}/${Math.floor(Math.random() * 100)}.jpg`"
                                alt="Random Person" class="w-full h-full object-cover">
                        </div>

                        <div>
                            <h4 class="font-semibold text-purple-900">Emily Davis</h4>
                            <p class="text-gray-600">Marketing Director, Brand Co</p>
                        </div>
                    </div>
                </div>

                <!-- Testimonial 3 -->
                <div class="bg-white p-8 rounded-lg shadow-md">
                    <div class="text-purple-600 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                    </div>
                    <p class="text-gray-700 mb-6">Their innovative approach and creative solutions have transformed our
                        business. We've seen remarkable growth since implementing their recommendations.</p>
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-gray-300 rounded-full mr-4 overflow-hidden">
                            <img :src="`https://randomuser.me/api/portraits/${['men', 'women'][Math.floor(Math.random() * 2)]}/${Math.floor(Math.random() * 100)}.jpg`"
                                alt="Random Person" class="w-full h-full object-cover">
                        </div>

                        <div>
                            <h4 class="font-semibold text-purple-900">David Wilson</h4>
                            <p class="text-gray-600">Founder, Startup Inc</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="bg-gradient-to-r from-purple-800 to-purple-900 text-white py-16">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-3xl font-semibold mb-6">Ready to Work With Us?</h2>
                <p class="text-xl mb-8 max-w-2xl mx-auto">Let's create something amazing together. Get in touch with our
                    team to discuss your project.</p>
                <nuxt-link href="/contact#contact"
                    class="inline-block px-8 py-3 bg-white text-purple-900 font-semibold rounded-lg hover:bg-purple-100 transition duration-300">
                    Contact Us
                </nuxt-link>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
// Or set at the page level
</script>