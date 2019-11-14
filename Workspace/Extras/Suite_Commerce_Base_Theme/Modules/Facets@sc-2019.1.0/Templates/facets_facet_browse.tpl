<section class="facets-facet-browse">
<div class="cms-landing-page-row-full-col">
		<div data-cms-area="cms-global-area-1" data-cms-area-filters="global"></div>
	</div>
	{{#if showResults}}
		<div class="facets-facet-browse-content">


			<div class="facets-facet-browse-results" itemscope="" itemtype="https://schema.org/ItemList">

				{{#if isCategory}}
					<div class="facets-facet-browse-category">
						<div data-view="Facets.Browse.CategoryHeading"></div>

						
					</div>
				{{/if}}
				<div class="ft-categories">
				<div data-view="Facets.CategoryCells" class="facets-category-cells"></div>
</div>
				<header class="facets-facet-browse-header">

					{{#if showItems}}
					<h1 class="facets-facet-browse-title" data-quantity="{{total}}">
						{{#if keywords}}
							{{#if isTotalProductsOne}}
								{{translate '1 Result for <span class="facets-facet-browse-title-alt">$(0)</span>' keywords}}
							{{else}}
								{{translate '$(0) Results for <span class="facets-facet-browse-title-alt">$(1)</span>' total keywords}}
							{{/if}}
						{{else}}
							{{#if isTotalProductsOne}}
								{{translate '1 Product'}}
							{{else}}
								{{translate '$(0) Products' total}}
							{{/if}}
						{{/if}}
					</h1>

					<nav class="facets-facet-browse-list-header">
						<div class="facets-facet-browse-list-header-actions" data-view="Facets.ItemListDisplaySelector"></div>

						<div class="facets-facet-browse-list-header-expander">
							<button class="facets-facet-browse-list-header-expander-button collapsed" data-toggle="collapse" data-target="#list-header-filters" aria-expanded="true" aria-controls="list-header-filters">
								{{translate 'Sort'}}
								<i class="facets-facet-browse-list-header-expander-icon"></i>
							</button>
						</div>

						<div class="facets-facet-browse-list-header-filters collapse" id="list-header-filters">
							<div class="facets-facet-browse-list-header-filters-wrapper">

								<div class="facets-facet-browse-list-header-filters-row">

									<div class="facets-facet-browse-list-header-filter-column" data-view="Facets.ItemListShowSelector">
									</div>

									<div class="facets-facet-browse-list-header-filter-column" data-view="Facets.ItemListSortSelector">
									</div>

									{{#if hasItemsAndFacets}}
										<!--<div class="facets-facet-browse-list-header-filter-column">
											<button class="facets-facet-browse-list-header-filter-facets" data-type="sc-pusher" data-target="product-search-facets">
												{{translate 'Narrow By'}}
												<i class="facets-facet-browse-list-header-filter-facets-icon"></i>
											</button>
										</div>-->
									{{/if}}
								</div>

							</div>
						</div>
					</nav>
					{{/if}}
				</header>

				<meta itemprop="name" content="{{title}}"/>

				<div data-cms-area="facets_facet_browse_cms_area_1" data-cms-area-filters="page_type"></div>

				<div id="banner-section-top" class="content-banner banner-section-top" data-cms-area="item_list_banner_top" data-cms-area-filters="path"></div>

				{{#if showItems}}
					<div class="facets-facet-browse-narrowedby" data-view="Facets.FacetsDisplay"></div>

					{{#if isEmptyList}}
						<div data-view="Facets.Items.Empty"></div>
					{{else}}
						<div class="facets-facet-browse-items" data-view="Facets.Items"></div>
					{{/if}}
				{{/if}}
			</div>

			<div class="facets-facet-browse-pagination" data-view="GlobalViews.Pagination"></div>
		</div>

		<div class="facets-facet-browse-cms-area-2" data-cms-area="facets_facet_browse_cms_area_2" data-cms-area-filters="page_type"></div>

	{{else}}
		<div class="facets-facet-browse-empty-items" data-view="Facets.Items.Empty"></div>
	{{/if}}

	<div class="cms-landing-page-row-full-col">
		<div data-cms-area="cms-global-area-2" data-cms-area-filters="global"></div>
	</div>
</section>



{{!----
Use the following context variables when customizing this template:

	total (Number)
	isTotalProductsOne (Boolean)
	title (String)
	hasItemsAndFacets (Boolean)
	collapseHeader (Boolean)
	keywords (undefined)
	showResults (Boolean)
	isEmptyList (Boolean)
	isCategory (Boolean)
	showItems (Number)

----}}
