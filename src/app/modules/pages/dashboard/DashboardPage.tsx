import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { QUERIES } from '../../../../_metronic/helpers'
import { getUsers } from '../../user-management/users/core/_requests'

const DashboardPage = () => {
  const navigate = useNavigate()

  // Utilizing your custom query structure to hook into your centralized API state management
  const { data: usersData, isLoading, isError } = useQuery(
    [QUERIES.USERS],
    getUsers,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onError: (error) => {
        console.error('Failed to load Users:', error)
      },
    }
  )

  // Safely fallback to 0 if data isn't loaded yet or if the API returns pagination/entities format
  const usersList = Array.isArray(usersData) 
    ? usersData 
    : (usersData as any)?.entities || (usersData as any)?.result?.entities || []
  
  const totalUsers = usersList.length

  const handleCardClick = () => {
    navigate('/user-management/users')
  }

  return (
    <div className="d-flex flex-column gap-8 py-5">
      
      {/* 1. Dashboard Welcome / Greeting Banner (Header Intact) */}
      <div className="card border-0 bg-light-primary rounded-4 overflow-hidden mb-3">
        <div className="card-body p-8 p-lg-12 d-flex align-items-center justify-content-between">
          <div className="d-flex flex-column gap-2">
            <h1 className="fw-bolder text-gray-900 fs-2qx lh-sm">
              Welcome to the Dashboard
            </h1>
            <p className="text-gray-600 fs-6 fw-semibold max-w-500px m-0">
              Access system metrics, database storage channels, and configure localized partner allocations from your central administration deck.
            </p>
          </div>
          <div className="d-none d-md-block">
            {/* Inline vector representation of Wasam Masirah Logo to guarantee rendering and zero dependency failures */}
            <svg 
              className="h-80px w-auto opacity-75 text-primary" 
              viewBox="0 0 180 40" 
              fill="currentColor"
              aria-label="Wasam Masirah Logo"
            >
              <rect x="10" y="10" width="20" height="20" rx="4" />
              <circle cx="20" cy="20" r="4" fill="white" />
              <text x="40" y="26" fontSize="14" fontWeight="bold" fill="currentColor">Wasam Masirah</text>
            </svg>
          </div>
        </div>
      </div>

      {/* 2. Interactive KPI Stats Section (Filtered to Total Users only) */}
      <div className="row g-6 justify-content-start">
        
        {/* Total Users Card (Main Action Tracker) */}
        <div className="col-12 col-md-4">
          {isLoading ? (
            /* KeenThemes Shimmer Loading State placeholder to avoid layout shift */
            <div className="card card-flush border-0 h-150px p-7 bg-white shadow-sm rounded-3">
              <div className="d-flex justify-content-between align-items-center h-100">
                <div className="d-flex flex-column gap-2 w-75">
                  <div className="h-40px bg-gray-200 rounded animate-pulse w-50"></div>
                  <div className="h-15px bg-gray-200 rounded animate-pulse w-75"></div>
                </div>
                <div className="symbol symbol-45px rounded-3 bg-gray-200 animate-pulse"></div>
              </div>
            </div>
          ) : isError ? (
            /* Inline elegant Error UI Alert block */
            <div className="card card-flush border-0 h-100 p-7 bg-light-danger border-danger border-opacity-25 rounded-3">
              <div className="d-flex align-items-center">
                <i className="fas fa-exclamation-triangle fs-2 text-danger me-3" />
                <span className="text-danger fw-bold fs-7">Failed to retrieve metrics</span>
              </div>
            </div>
          ) : (
            /* Live Total Users Card with dynamic hover animations */
            <div 
              onClick={handleCardClick}
              className="card card-flush border-0 h-100 hover-elevate-up cursor-pointer transition-all shadow-sm"
              style={{ 
                backgroundColor: '#F3F6FF',
                border: '1px solid rgba(63, 81, 181, 0.15)',
                transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className="card-header pt-7 d-flex justify-content-between align-items-center border-0 bg-transparent">
                <div className="card-title d-flex flex-column">
                  <span className="fs-1tx fw-bold text-gray-800 font-mono leading-none mb-1 text-center">
                    {totalUsers}
                  </span>
                  <span className="text-gray-600 fw-bold fs-6">Total Corporate Users</span>
                </div>
                <div className="symbol symbol-45px rounded-3">
                  <div className="symbol-label bg-primary bg-opacity-10 text-primary">
                    <i className="fas fa-users fs-3 text-primary" />
                  </div>
                </div>
              </div>
              
              <div className="card-body d-flex align-items-end pb-7 pt-2">
                <div className="d-flex align-items-center text-primary fw-bold fs-7">
                  Click to manage directory
                  <i className="fas fa-arrow-right ms-2 fs-8 transition-transform" />
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  )
}

export default DashboardPage