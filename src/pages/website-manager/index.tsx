import React, { useEffect, useRef } from "react";
import { Button } from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { UploadIcon } from "../../assets/icons/collection/UploadIcon";
import '../dashboard/index.scss';
import apiService from "../../api-config/services/Rap.service";
import { EditIcon } from "../../assets/icons/collection/EditIcon";
import { DeleteIcon } from "../../assets/icons/collection/DeleteIcon";

const WebsiteManager = () => {

  const navigate = useNavigate();
  const logoutBtnRef = useRef<any>();
  const [data, setData] = React.useState<any>([]);
  const [websiteName, setWebsiteName] = React.useState<string>('');
  const [websiteId, setWebsiteId] = React.useState<string>("");
  const [showAddForm, setShowAddForm] = React.useState<boolean>(false);
  const [showEditForm, setShowEditForm] = React.useState<boolean>(false);

  const handleLogout = () => {
    navigate("/login");
    localStorage.clear();
  };

  useEffect(() => {
    fetchWebsiteList()
  }, []);

  const fetchWebsiteList = async () => {
    try {
      const response = await apiService.get('/whitelist-website');
      if (response.data.statusCode === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleAddWebsite = async () => {
    try {
      // trim white space and check if empty then return false
      if (!websiteName.trim()) {
        return false;
      }

      const response = await apiService.post('/whitelist-website', {
        websiteHostName: websiteName
      });
      if (response.data.statusCode === 200) {
        setShowAddForm(false);
        fetchWebsiteList();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleDeleteWebsite = async (id: number) => {
    try {
      const response = await apiService.delete(`/whitelist-website/${id}`);
      fetchWebsiteList();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleEditWebsite = async (item: any) => {
    try {
      setWebsiteName(item.websiteHostName);
      setWebsiteId(item._id);
      setShowEditForm(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleUpdateWebsite = async () => {
    try {
      if (!websiteName.trim()) {
        return false;
      }
      const response = await apiService.patch(`/whitelist-website/${websiteId}`, {
        websiteHostName: websiteName
      });
      if (response.data.statusCode === 200) {
        setShowEditForm(false);
        fetchWebsiteList();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <>
      <section>
        <header>
          <h1 className='title'>Smartsheet </h1>
          <div className='btn-action'>
            <Button
              onClick={() => navigate('/dashboard')}
              title="Manage Users"
              style="purple-dark"
            />
            <Button
              ref={logoutBtnRef}
              onClick={handleLogout}
              title="Logout"
              style="purple-light"
              icons={<UploadIcon color='#8a6fab' size='16' />}
            />
          </div>
        </header>
        {
          showAddForm && (

            <div className='addedit-form'>
              <div className='form-control'>
                <label>Website Name</label>
                <input type='text' placeholder='Enter website name' value={websiteName} onChange={(e) => setWebsiteName(e.target.value)} />
              </div>

                <Button
                  type="button"
                  onClick={() => handleAddWebsite()}
                  title="Save"
                  style="purple-dark"
                />
                <Button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  title="Cancel"
                  style="purple-light"
                />
            </div>

          )
        }

        {
          showEditForm && (

            <div className='addedit-form'>
              <div className='form-control'>
                <label>Website Name</label>
                <input type='text' placeholder='Enter website name' value={websiteName} onChange={(e) => setWebsiteName(e.target.value)} />
              </div>

                <Button
                  type="button"
                  onClick={() => handleUpdateWebsite()}
                  title="Save"
                  style="purple-dark"
                />
                <Button
                  type="button"
                  onClick={() => setShowEditForm(false)}
                  title="Cancel"
                  style="purple-light"
                />
            </div>
          )
        }

        {
          !showAddForm && !showEditForm &&
          <>
            <div className='add-website-action'>
              <Button
                onClick={() => setShowAddForm(true)}
                title="Add Website"
                style="purple-dark"
              />
            </div>

            <table className='custom-table'>
              {/* Render table headers */}
              <thead>
                <tr>
                  <th>Website Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {/* Render table body */}
              <tbody>
                {
                  data.map((item: any, index: number) => (
                    <tr key={index}>
                      <td>{item.websiteHostName}</td>
                      <td>
                        <div className='actions'>
                          <div onClick={() => handleEditWebsite(item)} title='Edit Website'><EditIcon color='green' size='18' /></div>
                          <div onClick={() => handleDeleteWebsite(item._id)} title='Delete Website'><DeleteIcon size='18' /></div>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </>
        }

      </section>
    </>
  );
};

export default WebsiteManager;