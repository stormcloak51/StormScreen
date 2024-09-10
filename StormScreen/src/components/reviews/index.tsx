import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card'

type ReviewProps = {
	rating: number
	text: string
	username: string
}

interface IReviews {
	reviews: ReviewProps[]
}

const Reviews = () => {
	const [reviewsData, setReviewsData] = useState<null | IReviews>(null)
	

	useEffect(() => {
		const fetchReviews = async () => {
      try {
        const docRef = doc(db, "reviews", "vtpBIyFptNXVx6gqB76T");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const reviewsData = docSnap.data().reviews;
					setReviewsData({reviews: reviewsData});
        } else {
          console.log("No such document!");
        }
      } catch (err) {
        console.log(err);
      } finally {
        // setLoading(false);
      }
		}

		fetchReviews()
	}, [])

	return (
		<main className='mt-[50px] rounded-xl border bg-card text-card-foreground shadow px-[30px] py-[30px] dark:border-slate-600 max-lg:px-[20px]'>
			<h1 className='text-4xl font-inter font-bold mb-5'>Reviews</h1>
				<section className='flex flex-col-reverse'>
					{reviewsData?.reviews.map((review, index) => {
						return (
							<Card key={index}>
								<CardHeader className='flex flex-row items-center justify-between'>
									<h3 className='text-xl font-bold font-inter'>{review.username}</h3>
									<h3 className='text-xl font-bold font-inter'>Rating: {Math.round(review.rating * 2) / 2}</h3>
								</CardHeader>
								<CardContent>
									<CardDescription className='text-slate-950'>{review.text}</CardDescription>
								</CardContent>
							</Card>
					)})}
				</section>
		</main>
	)
}

export default Reviews