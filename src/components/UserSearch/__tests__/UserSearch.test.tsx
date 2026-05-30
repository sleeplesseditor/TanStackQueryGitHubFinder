import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import UserSearch from '../UserSearch';

const queryClient = new QueryClient();

describe('UserSearch', () => {
    describe('component rendering', () => {
        beforeEach(() => {
            render(
                <QueryClientProvider client={queryClient}>
                    <UserSearch />
                </QueryClientProvider>
            );
        });

        afterEach(cleanup);

        it('should render the main container element', () => {
            const containerElement = screen.getByTestId('user-search-container');
            expect(containerElement).toBeInTheDocument();
        });

        it('should render an input element for searching for users', () => {
            const inputElement = screen.getByTestId('user-search__input');
            expect(inputElement).toBeInTheDocument();
        });

        it('should not render an initial list of users upon initial render', () => {
            const userListElement = screen.queryByTestId('user-search__results-container');
            expect(userListElement).not.toBeInTheDocument();
        });

        it('should not display any loading or error messages upon initial render', () => {
            const loadingMessage = screen.queryByText(/loading/i);
            const errorMessage = screen.queryByText(/error/i);
            expect(loadingMessage).not.toBeInTheDocument();
            expect(errorMessage).not.toBeInTheDocument();
        });
    });

    describe('initial rendering activity', () => {
        let getItemSpy: any;
        let setItemSpy: any;

        beforeEach(() => {
            localStorage.setItem('recentUsers', JSON.stringify(['user1', 'user2']));

            getItemSpy = vi.spyOn(localStorage, 'getItem');
            setItemSpy = vi.spyOn(localStorage, 'setItem');

            render(
                <QueryClientProvider client={queryClient}>
                    <UserSearch />
                </QueryClientProvider>
            );
        });

        afterEach(() => {
            getItemSpy.mockClear();
            setItemSpy.mockClear();
            localStorage.clear();
        });
        
        it('should check the localStorage for any recent searches and render them if they exist', async () => {
            await waitFor(() => {
                expect(getItemSpy).toHaveBeenCalledWith('recentUsers');
            });
        });

        it('should call localStorage setItem if localStorage contains recent users', async () => {
            await waitFor(() => {
                expect(setItemSpy).toHaveBeenCalledWith('recentUsers', JSON.stringify(['user1', 'user2']));
            });
        });
    });
});