import React, { useEffect, useRef, useState } from 'react'
import apiService from '../../api-config/services/Rap.service';
import 'react-responsive-modal/styles.css';
import { Button } from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import PlaceholderImg from '../../assets/images/img-placeholder-img.png';
import { Skeleton } from '../../components/skeleton/Skeleton';
import { RefreshIcon } from '../../assets/icons/collection/RefreshIcon';
import { TrophyIcon } from '../../assets/icons/collection/TrophyIcon';
import { PatternIcon } from '../../assets/icons/collection/PatternIcon';

const UserListing = () => {
    const [data, setData] = useState<any[]>([]);
    const logoutBtnRef = useRef<any>();
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            // debugger;
            const response = await apiService.get('/users/findOneRep');
            setData(response.data.data);
            console.log("response.data.data =>", response.data.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className='leaderboard-wrapper'>
            <div className='leaderboard-inner'>
                <header>
                    <h1 className='title'>Leaderboard</h1>

                    {/* <div className='btn-action'>    
                        <Button
                            ref={logoutBtnRef}
                            onClick={() => fetchData()}
                            title="Refresh"
                            style="purple-dark"
                            icons={<RefreshIcon color='#ffffff' />}
                        />
                    </div> */}
                </header>

                <div className='winner-box'>
                    <div className='winner-details'>
                        <TrophyIcon />
                        <div className='user-detail'>
                            {data[0]?.imageUrl ? (
                                <img src={process.env.REACT_APP_API_URL + "/users/image/" + data[0]?.imageUrl} alt={data[0]?.name} height={84} width={84} />
                            ) : (
                                <img src={PlaceholderImg} alt={data[0]?.name} height={84} width={84} />
                            )}
                            {data[0]?.name}
                        </div>
                    </div>
                    <div className='winner-text'>WINNER</div>
                    <div className='congrets-text'>Congratulations!</div>
                    <i className='pattern-icon'><PatternIcon /></i>
                </div>

                <div className='table-wrapper'>
                    <table className='custom-table'>
                        {/* Render table headers */}
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        {/* Render table rows with data */}
                        <tbody>
                            {data?.length ? (
                                <>

                                    {data.slice(1).map((item, index) => (
                                        <tr key={item?.id}>
                                            <td>{item?.rank}</td>
                                            <td>
                                                <div className='user-detail'>
                                                    {
                                                        item?.imageUrl ? (
                                                            <img src={process.env.REACT_APP_API_URL + "/users/image/" + item?.imageUrl} alt={item?.name} height={40} width={40} />
                                                        ) : (
                                                            <img src={PlaceholderImg} alt={item?.name} height={40} width={40} />
                                                        )
                                                    }{item?.name}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <>
                                    <tr>
                                        <td><Skeleton /></td>
                                        <td><Skeleton /></td>
                                    </tr>
                                    <tr>
                                        <td><Skeleton /></td>
                                        <td><Skeleton /></td>
                                    </tr>
                                    <tr>
                                        <td><Skeleton /></td>
                                        <td><Skeleton /></td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default UserListing;
