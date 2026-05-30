import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import RecentSearches from '../RecentSearches';
import * as GitHubAPI from '@api/github';

let queryClient: QueryClient;
let prefetchQuerySpy: any;

const onSelectMock = vi.fn();

const props = {
    onSelect: onSelectMock,
    recentUsers: ['user1', 'user2', 'user3']
}

describe('RecentSearches', () => {
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

            render(
                <QueryClientProvider client={queryClient}>
                    <RecentSearches {...props} />
                </QueryClientProvider>
            );
        });

        afterEach(cleanup);

        it('should render the main container element', () => {
            const containerElement = screen.getByTestId('recent-searches-container');
            expect(containerElement).toBeInTheDocument();
        });

        it('should render any users passed in via the recentUsers prop', () => {
            const userElements = screen.getAllByRole('button');
            expect(userElements).toHaveLength(props.recentUsers.length);
            
            props.recentUsers.forEach((user) => {
                expect(screen.getByText(user)).toBeInTheDocument();
            });
        });
    });

    describe('user interaction', () => {
        beforeEach(() => {
            queryClient = new QueryClient();
            prefetchQuerySpy = vi.spyOn(queryClient, 'prefetchQuery');
            vi.spyOn(GitHubAPI, 'searchGitHubUsers').mockResolvedValue({ items: [] });

            render(
                <QueryClientProvider client={queryClient}>
                    <RecentSearches {...props} />
                </QueryClientProvider>
            );
        });

        afterEach(cleanup);

        it('should call the onSelect callback with the correct username when a user is clicked', () => {
            const userButtons = screen.getAllByRole('button');
            userButtons.forEach((button, index) => {
                button.click();
                expect(onSelectMock).toHaveBeenCalledWith(props.recentUsers[index]);
            });
        });

        it('should prefetch user data on mouseenter', async () => {
            const user = userEvent.setup();
            
            render(
                <QueryClientProvider client={queryClient}>
                    <RecentSearches 
                        recentUsers={['john', 'jane']} 
                        onSelect={() => {}}
                    />
                </QueryClientProvider>
            );

            const exampleUserBtn = screen.getByRole('button', { name: /john/i });

            await user.hover(exampleUserBtn);

            expect(prefetchQuerySpy).toHaveBeenCalledWith(
                expect.objectContaining({
                    queryKey: ['users', 'john']
                })
            );
        });

        it('should prefetch different users when hovering different buttons', async () => {
            const user = userEvent.setup();
            
            render(
                <QueryClientProvider client={queryClient}>
                    <RecentSearches 
                        recentUsers={['john', 'jane']} 
                        onSelect={() => {}}
                    />
                </QueryClientProvider>
            );

            const secondUserBtn = screen.getByRole('button', { name: /jane/i });
            await user.hover(secondUserBtn);

            expect(prefetchQuerySpy).toHaveBeenCalledWith(
                expect.objectContaining({
                    queryKey: ['users', 'jane']
                })
            );
        });
    });
});