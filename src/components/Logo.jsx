import React from 'react';

const Logo = ({ className = "w-8 h-8" }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <defs>
            <linearGradient id="blueFireGradient" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#60A5FA" /> {/* blue-400 */}
                <stop offset="50%" stopColor="#3B82F6" /> {/* blue-500 */}
                <stop offset="100%" stopColor="#1E40AF" /> {/* blue-800 */}
            </linearGradient>
        </defs>
        <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 11.5373 21.3065 11.4608 21.0672 11.8568C19.9289 13.7406 18.2956 15.3411 16.3249 16.4251C15.8247 16.7003 15.2227 16.2737 15.3364 15.713C15.8398 13.2292 15.3789 10.6366 14.1027 8.44111C13.2676 7.00445 12.0163 2 12 2C11.9837 2 10.7324 7.00445 9.8973 8.44111C8.62106 10.6366 8.16024 13.2292 8.66358 15.713C8.77735 16.2737 8.17531 16.7003 7.67512 16.4251C5.70438 15.3411 4.07111 13.7406 2.93276 11.8568C2.69352 11.4608 2 11.5373 2 12C2 17.5228 6.47715 22 12 22Z"
            fill="url(#blueFireGradient)"
            stroke="url(#blueFireGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default Logo;
