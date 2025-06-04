import configPromise from '@payload-config'
import { getPayload } from 'payload'


import { Footer } from "./footer";
import { Navbar } from "./navbar";
import SearchFilters from "./search-filters";
import { Category } from '@/payload-types';

interface Props {
  children: React.ReactNode;
}
async function layout({ children }: Props) {

  const payload = await getPayload({
      config: configPromise
    })
  
    const data = await payload.find({
      collection: "categories",
      depth:1, //Populate subcateegories, subcategories.[0] will be a type of category
      pagination:false,
      where:{
        parent:{
          exists: false
        }
      }
    })
  
    const formattedData = data.docs.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
        //Because of depth one it is confirm that doc will of type "category"
        ...(doc as Category),
        subcategories: undefined
      }))
    }))

    console.log({data, formattedData});




  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData}/>
      <div className="flex-1 bg-[#F4F4F0]">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default layout;
