import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import UserCardDialog from '../UserCardDialog';
import * as GitHubAPI from '@api/github';

let queryClient: QueryClient;

const mockUserDetails = {
    avatar_url: 'https://example.com/avatar.jpg',
    login: 'testuser',
    name: 'Test User',
    location: 'San Francisco',
    bio: 'A test user',
    public_repos: 42,
    followers: 100,
    public_gists: 5,
    html_url: 'https://github.com/testuser'
};

const useRefSpy = vi.spyOn(React, 'useRef').mockReturnValue({ current: document.createElement('dialog') });

describe('UserCardDialog', () => {
    describe('initial rendering', () => {
        beforeEach(() => {
            queryClient = new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 0,  // Force refetch
                        gcTime: 0      // Don't cache
                    }
                }
            });
            vi.spyOn(GitHubAPI, 'getGitHubUserDetails').mockResolvedValue(mockUserDetails);
        });

        afterEach(() => {
            cleanup();
            vi.clearAllMocks();
        });

        it('should render the dialog element', () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <UserCardDialog 
                        dialogRef={useRefSpy} 
                        onClose={() => {}} 
                        user={{ login: 'testuser' }} 
                    />
                </QueryClientProvider>
            )
            expect(screen.getByTestId('user-card-dialog')).toBeInTheDocument();
        });
    });

    describe('rendering with user details', () => {
        beforeEach(() => {
            queryClient = new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 0,
                        gcTime: 0
                    }
                }
            });
            vi.spyOn(GitHubAPI, 'getGitHubUserDetails').mockResolvedValue(mockUserDetails);
        });

        afterEach(() => {
            cleanup();
            vi.clearAllMocks();
        });

        it('should initially display a loading message when fetching user details', () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <UserCardDialog dialogRef={useRefSpy} onClose={() => {}} user={{ login: 'testuser' }} />
                </QueryClientProvider>
            );
            
            const loadingMessage = screen.getByText(/loading profile details/i);
            expect(loadingMessage).toBeInTheDocument();
        });

        it('should display user details once loaded', async () => {
            render(
                <QueryClientProvider client={queryClient}>
                    <UserCardDialog dialogRef={useRefSpy} onClose={() => {}} user={{ login: 'testuser' }} />
                </QueryClientProvider>
            );

            await waitFor(() => {
                expect(screen.getByText('Test User')).toBeInTheDocument();
            });
        });

    });
});