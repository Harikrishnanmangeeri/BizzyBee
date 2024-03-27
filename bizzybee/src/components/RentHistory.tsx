"use client";
import axiosInstance from "@/axios/axios";
import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "react-paginate";
import styled from "styled-components";
import Button from "@mui/material/Button";
import EditModal from "./EditModal";


const StyledTableContainer = styled(TableContainer)`
  background-color: #f8f9fa;
  margin-bottom: 20px;
`;

const StyledTable = styled(Table)`
  min-width: 650px;
`;

const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: #f2f2f2;
  }
`;

const StyledTableCell = styled(TableCell)`
  font-weight: bold;
`;

interface Rent {
    _id: string;
    name: string;
    location: string;
    date: Date;
    receivedDate: Date;
    total: number;
    markReceived: boolean;
    productName: string; 
    quantity: number;  
  }
  

const RentHistory: React.FC = () => {
  const [rentHistory, setRentHistory] = useState<Rent[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedRent, setSelectedRent] = useState<Rent | null>(null);
  const [editedReceivedDate, setEditedReceivedDate] = useState<Date | null>(
    null
  );

  useEffect(() => {
    fetchRentHistory(currentPage);
  }, [currentPage]);

  const fetchRentHistory = async (pageNumber: number) => {
    try {
      const response = await axiosInstance.post<{
        rent: Rent[];
        pageCount: number;
      }>("user/renthistory", { page: pageNumber });
      setRentHistory(response.data.rent);
      setPageCount(response.data.pageCount);
    } catch (error) {
      console.error("Error fetching rent history:", error);
    }
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleEditClick = (rent: Rent) => {
    setSelectedRent(rent);
    setIsEditModalOpen(true);
    setEditedReceivedDate(rent.receivedDate);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedRent(null);
    setEditedReceivedDate(null);
  };

  const handleReceivedDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedReceivedDate(new Date(e.target.value));
  };

  const handleSaveChanges = async () => {
    if (selectedRent && editedReceivedDate) {
      try {
    
        await axiosInstance.post("user/updateReceivedDate", {
          rentId: selectedRent._id,
          receivedDate: editedReceivedDate,
        });
      
        setRentHistory((prevRentHistory) =>
          prevRentHistory.map((rent) =>
            rent._id === selectedRent._id
              ? { ...rent, receivedDate: editedReceivedDate }
              : rent
          )
        );
        // Close the modal
        handleModalClose();
      } catch (error) {
        console.error("Error updating received date:", error);
      }
    }
  };

  return (
    <div>
      <h2 style={{ color: "#007bff" }}>Rent History</h2>
      <StyledTableContainer component={Paper}>
        <StyledTable>
          <TableHead>
            <TableRow>
              <StyledTableCell>Serial No.</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Received Date</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell>Mark Received</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rentHistory?.map((rent, index) => (
              <StyledTableRow key={rent._id}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{rent.name}</StyledTableCell>
                <StyledTableCell>{rent.location}</StyledTableCell>
                <StyledTableCell>
                  {new Date(rent.date).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell>
                  {rent.receivedDate instanceof Date
                    ? rent.receivedDate.toLocaleDateString()
                    : "-"}
                </StyledTableCell>
                <StyledTableCell>{rent.total}</StyledTableCell>
                <StyledTableCell>
                  <input
                    type="checkbox"
                    checked={rent.markReceived}
                    onChange={(e) => {
                      // Handle checkbox change here
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <Button onClick={() => handleEditClick(rent)}>Edit</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
      <Pagination
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
      />
      <div>
      <h2 style={{ color: "#007bff" }}>Rent History</h2>
    
      <EditModal
        open={isEditModalOpen}
        onClose={handleModalClose}
        selectedRent={selectedRent}
        editedReceivedDate={editedReceivedDate}
        onReceivedDateChange={handleReceivedDateChange}
        onSaveChanges={handleSaveChanges}
      />
    </div>
    </div>
  );
};

export default RentHistory;
