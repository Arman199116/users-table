import React from 'react'
import { IPagin } from '../model'

const Pagination : React.FC<IPagin> = ({nPages, currentPage, setCurrentPage}) => {
    const pageNumbers : number[] = Array.from(Array(nPages + 1).keys()).slice(1);
    const nextPage = () => {
        if(currentPage !== nPages) 
            setCurrentPage(currentPage + 1)
    }
    const prevPage = () => {
        if(currentPage !== 1) 
            setCurrentPage(currentPage - 1)
    }
    return (
        <nav>
            <ul className="pagination justify-content-center mt-6">
                <li className="page-item">
                    <a className="page-link" 
                        onClick={e => prevPage()}
                    >
                        Previus
                    </a>
                </li>
                {
                    pageNumbers.map((pgNumber : any) => (
                        <li key={pgNumber}
                            className={`page-item ${currentPage == pgNumber ? 'active' : ''}`}
                        >
                            <a className="page-link"
                                onClick={e => setCurrentPage(pgNumber)}
                            >
                                {pgNumber}
                            </a>
                        </li>
                    ))
                }

                <li className="page-item">
                    <a className="page-link" 
                        onClick={e => nextPage()}
                    >
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default React.memo(Pagination);
