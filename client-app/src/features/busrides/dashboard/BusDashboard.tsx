import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { Grid, Loader} from 'semantic-ui-react';
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import RideListItemPlaceholder from '../../rides/dashboard/RideListItemPlaceholder';
import BusFilters from './BusFilters';
import BusList from './BusList';

export default observer(function BusDashboard() {

    const { busStore } = useStore();
    const { loadRides, rideRegistry, setPagingParams, pagination } = busStore;
    const [loadingNext, setLoadingNext] = useState(false);
    const [search, setSearch] = useState('');

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadRides().then(() => setLoadingNext(false));
    }


    useEffect(() => {
        if (rideRegistry.size <= 1) loadRides();
    }, [rideRegistry.size, loadRides])

    return (
        <Grid>
            <Grid.Column width='10'>
                {busStore.loadingInitial && !loadingNext ? (
                    <>
                        <RideListItemPlaceholder />
                        <RideListItemPlaceholder />
                    </>
                ) : (
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={handleGetNext}
                        hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                        initialLoad={false}
                    >
                        <div className="ui action input" style={{ width: '100%', marginTop: 25 }}>
                            <input type="text" placeholder="Search BusRides..." onChange={event => setSearch(event.target.value)} />
                            <button className="ui icon button teal">
                                <i className="search icon"></i>
                            </button>
                        </div>

                        <BusList search={search.toLowerCase()}/>
                    </InfiniteScroll>
                )}
            </Grid.Column>
            <Grid.Column width='6'>
                <BusFilters />
            </Grid.Column>
            <Grid.Column width={10}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
})