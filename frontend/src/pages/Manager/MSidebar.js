// import React, { useState } from "react";
// import styled from "styled-components";
// import Logo from "../../assets/download (1).png"
// import { Link } from "react-router-dom";
// import { MSidebarData } from "../../Data/Mdata";
// import { UilBars } from "@iconscout/react-unicons";
// import { motion } from "framer-motion";

// const MSidebar = () => {
//     const [selected, setSelected] = useState(0);
//     const [expanded, setExpaned] = useState(true);
//     const sidebarVariants = {
//       true: {
//         left : '0'
//       },
//       false:{
//         left : '-60%'
//       }
//     }

//   return (
//     <MSidebarContainer>
//       <div
//         className="bars"
//         style={expanded ? { left: "50%" } : { left: "5%" }}
//         onClick={() => setExpaned(!expanded)}
//       >
//         <UilBars />
//       </div>
//       <motion.div className="Sidebar" variants={sidebarVariants}
//        animate={window.innerWidth<=768?`${expanded}`:''}
//       >
//         {/* <div className="logo">
//           <img src={Logo} alt="logos" />
//         </div> */}
//         <div className="menu">
//           {MSidebarData.map((item, index) => {
//             return (
//               <Link
//                 to={`/${item.key}`}
//                 key={item.key}
//                 style={{ textDecoration: "none", color: "black" }}
//               >
//                 <div
//                   className={
//                     selected === index ? "menuitem active" : "menuitem"
//                   }
//                   onClick={() => setSelected(index)}
//                 >
//                   <item.icon style={{ color: "black" }} />
//                   <span className="menu-text" style={{ color: "black" }}>
//                     {item.heading}
//                   </span>
//                   {selected === index && (
//                     <div className="active-indicator"></div>
//                   )}

//                 </div>
//               </Link>
//             );
//           })}
          
//         </div>
//       </motion.div>
      
//     </MSidebarContainer>
//   )
// }

// const MSidebarContainer = styled.div`
//   .Sidebar {
//     display: flex;
//     flex-direction: column;
//     position: relative;
//     padding-top: 4rem;
//     transition: all 300ms ease;
//   }
//   .logo {
//     justify-content: flex-end;
//     margin: 1rem;
//     img {
//       height: 5rem;
//       width: 5rem;
//     }
//   }
//   .menu {
//     margin-top: 2rem;
//     display: flex;
//     flex-direction: column;
//     gap: 2rem;
//   }
//   .menuitem {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     height: 2.5rem;
//     margin-left: 2rem;
//     position: relative;
//     transition: all 300ms ease;
//     border-radius: 0.7rem;
//     font-size: 14px;
    

//   }
//   .menuitem:hover {
//     cursor: pointer;
//   }
//   .menu .menuItem:last-child {
//     position: absolute;
//     bottom: 2.3rem;
//     width: 100%;
//   }
//   .bars {
//     display: none;
//   }

//   @media (max-width: 1200px) {
//     .logo {
//       display: none;
//     }

//     .menuitem .menu-text {
//       display: none;
//     }
//   }
//   @media (max-width: 768px) {
//     .Sidebar {
//       position: fixed;
//       z-index: 9;
//       background: white;
//       width: 50%;
//       padding-right: 1rem;
//       height: 100%;
//     }
//     .menuitem .menu-text {
//       display: block;
//     }
//     .bars{
//     display: flex;
//     position: fixed;
//     top: 2rem;
//     background: white;
//     padding:10px;
//     border-radius: 10px;
//     z-index: 9;
//   }
//   @media (min-width: 769px) {
//     .bars {
//       display: none;
//     }
//   }
//   }

// `;
// export default MSidebar

import React, { useState , useEffect} from "react";
import styled from "styled-components";
// import Logo from "../../../assets/download (1).png";
import { MSidebarData } from "../../Data/Mdata";
import { Link } from "react-router-dom";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";

const MSidebar = () => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(window.innerWidth > 768);

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      setExpanded(!expanded);
    }
  };

  const sidebarVariants = {
    true: {
      left: '0'
    },
    false: {
      left: '-60%'
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setExpanded(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AdminSidebarContainer>
      <div
        className="bars"
        style={expanded ? { left: "50%" } : { left: "5%" }}
        onClick={toggleSidebar}
      >
        <UilBars />
      </div>
      <motion.div className="Sidebar" variants={sidebarVariants} animate={expanded ? "true" : "false"}>
        <div className="menu">
          {MSidebarData.map((item, index) => (
            <Link
              to={`/${item.key}`}
              key={item.key}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div
                className={selected === index ? "menuitem active" : "menuitem"}
                onClick={() => setSelected(index)}
              >  
                <item.icon style={{ color: "black" }} />
                <span className="menu-text" style={{ color: "black" }}>
                  {item.heading}
                </span>
                {selected === index && <div className="active-indicator"></div>}
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </AdminSidebarContainer>
  );
};

const AdminSidebarContainer = styled.div`
  .Sidebar {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-top: 4rem;
    transition: all 300ms ease;
  }
  .logo {
    justify-content: flex-end;
    margin: 1rem;
    img {
      height: 5rem;
      width: 5rem;
    }
  }
  .menu {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .menuitem {
    display: flex;
    align-items: center;
    gap: 1rem;
    height: 2.5rem;
    margin-left: 2rem;
    position: relative;
    transition: all 300ms ease;
    border-radius: 0.7rem;
    font-size: 14px;
  }
  .menuitem:hover {
    cursor: pointer;
  }
  .menu .menuItem:last-child {
    position: absolute;
    bottom: 2.3rem;
    width: 100%;
  }
  .bars {
    display: none;
  }

  @media (max-width: 1200px) {
    .logo {
      display: none;
    }

    .menuitem .menu-text {
      display: none;
    }
  }
  @media (max-width: 768px) {
    .Sidebar {
      position: fixed;
      z-index: 9;
      background: white;
      width: 50%;
      padding-right: 1rem;
      height: 100%;
    }
    .menuitem .menu-text {
      display: block;
    }
    .bars{
    display: flex;
    position: fixed;
    top: 2rem;
    background: white;
    padding:10px;
    border-radius: 10px;
    z-index: 9;
  }
  @media (min-width: 769px) {
    .bars {
      display: none;
    }
  }
  }
`;
export default MSidebar;
