import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trendmedia } from '../../Context/Media';

import pagiSize from './Pagination.module.css';


export default function Pagination({mediaType}) {

  const {handllePage, handlleMoviePage , currentPage , totlalTvPag , moviePage , totalMvPage } = useContext(Trendmedia)

    // const isFirstPage = currentPage === 1;
    // const isLastPage = currentPage === totlalTvPag;

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const isFirstPage = mediaType === 'movie' ? moviePage === 1 : currentPage === 1;
    const isLastPage = mediaType === 'movie' ? moviePage === totalMvPage : currentPage === totlalTvPag;

    const recentPage = mediaType === 'movie' ? moviePage : currentPage;
    const totalPageCount = mediaType === 'movie' ? totalMvPage : totlalTvPag;
    const handlePageChange = mediaType === 'movie' ? handlleMoviePage : handllePage;

    const pageRange = [];
    const startPage = Math.max(1, recentPage - 1);
    const endPage = Math.min(totalPageCount, startPage + 2);

    for (let i = startPage; i <= endPage; i++) {
        pageRange.push(i);
    }

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768); // Update state on resize
        };
    
        window.addEventListener('resize', handleResize);
    
        // Cleanup function to remove the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
      }, []); // Empty dependency array ensures the effect runs only once on mount



  return (
   <>


    <nav aria-label="Page navigation">
      {/* <ul className="pagination pagination-sm justify-content-center"> */}
      <ul className={`pagination ${pagiSize.pagiSize} justify-content-center`}>


          <li className={`page-item ${isFirstPage ? 'disabled' : ''}`}>
              <Link className="page-link" onClick={() => (recentPage > 1 ? handlePageChange(recentPage - 1) : null)} to="#" aria-label="Previous">
                  <span aria-hidden="true">Prev</span>
              </Link>
          </li>


          <li className={`page-item ${isFirstPage ? 'disabled' : ''}`}>
              <Link className="page-link" onClick={() => handlePageChange(1)} to="#" aria-label="First">
                  <span aria-hidden="true">First</span>
              </Link>
          </li>

          {pageRange.map((page) => (
              <li key={page} className={`page-item ${recentPage === page ? 'active' : ''}`}>
                  <Link className="page-link" onClick={() => handlePageChange(page)} to="#">
                      {page}
                  </Link>
              </li>
          ))}

            <li className={`page-item ${isLastPage ? 'disabled' : ''}`}>
              <Link className="page-link" onClick={() => handlePageChange(totalPageCount)} to="#" aria-label="Last">
                  <span aria-hidden="true">Last</span>
              </Link>
            </li>

          <li className={`page-item ${isLastPage ? 'disabled' : ''}`}>
              <Link className="page-link" onClick={() => (recentPage < totalPageCount ? handlePageChange(recentPage + 1) : null)} to="#" aria-label="Next">
                  <span aria-hidden="true">Next</span>
              </Link>
          </li>
      </ul>
    </nav>


   </>
    
  )
}






