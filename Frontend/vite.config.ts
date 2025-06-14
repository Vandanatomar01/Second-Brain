import { defineConfig } from 'vite'
/** @type {import('tailwindcss').Config} */
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()],
})

// export default defineConfig({

//     // content : [
//     //     "./src/**/*.{js,ts,jsx,tsx}",
//     //   ],
//     //   theme : {
//     //     extend: {
//     //       colors : {
//     //         purple : {
//     //           200 : "#d9ddee",
//     //           500 : "#9492db",
//     //           600 : "#7164c0",
//     //         }
//     //       }
//     //     }
//     //   },

 
//   plugins: [
//     tailwindcss(),
//     ],
// })

// export default {
//   content : [
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme : {
//     extend: {
//       colors : {
//         purple : {
//           200 : "#d9ddee",
//           500 : "#9492db",
//           600 : "#7164c0",
//         }
//       }
//     }
//   },
//   plugins : [],

// }
