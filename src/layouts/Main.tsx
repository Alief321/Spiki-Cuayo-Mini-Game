// import React, { Suspense } from 'react';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// import Loading from '../components/Loading';

// interface MainLayoutProps {
//   children: React.ReactNode;
//   excludeLayout?: boolean;
// }

// const MainLayout: React.FC<MainLayoutProps> = ({ children, excludeLayout = false }) => {
//   return (
//     <Suspense fallback={<Loading />}>
//       <div className="min-h-screen w-full overflow-x-hidden flex flex-col justify-center items-center bg-gray-50 lg:px-24">
//         {/* Conditionally render Navbar and Footer */}
//         {!excludeLayout && <Navbar />}
//         <main className="flex-grow md:w-[85%] w-[87%] my-16 pt-8">{children}</main>
//         {!excludeLayout && <Footer />}
//       </div>
//     </Suspense>
//   );
// };

// export default MainLayout;
