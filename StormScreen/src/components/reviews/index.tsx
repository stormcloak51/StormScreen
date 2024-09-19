import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { FC, useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader } from '../ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { Skeleton } from '../ui/skeleton'
import useAuth from '@/hooks/use-auth'
import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

type ReviewProps = {
	rating: number
	text: string
	photoURL: string | null
	username: string | null
}

interface IReviews {
	reviews: ReviewProps[]
}

type ReviewId = {
	id: string
}

const Reviews: FC<ReviewId> = ({ id }) => {
	const [reviewsData, setReviewsData] = useState<null | IReviews>(null)
	const [reviewValue, setReviewValue] = useState('')
	const [loading, setLoading] = useState(true)
	const { displayName, isAuth, photoURL } = useAuth()
	console.log('phot', photoURL)
	useEffect(() => {
		setLoading(true)
	}, [id])

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				setReviewsData(null)
				const docRef = doc(db, 'reviews', id)
				const docSnap = await getDoc(docRef)
				if (docSnap.exists()) {
					const reviewsData = docSnap.data() as IReviews
					// console.log(reviewsData)
					setReviewsData(reviewsData)
				} else {
					setReviewsData(null)
				}
			} catch (err) {
				console.log(err)
			} finally {
				setLoading(false)
			}
		}

		if (loading) fetchReviews()
	}, [id, reviewsData, loading])

	const handleSend = async () => {
		if (reviewsData) {
			const reviewsDocRef = doc(db, 'reviews', id)
			await setDoc(reviewsDocRef, {
				reviews: [
					...reviewsData.reviews,
					{
						rating: 5,
						photoURL,
						text: reviewValue,
						username: displayName,
					},
				],
			})
			setLoading(true)
		} else {
			console.log('waht')

			await setDoc(doc(db, 'reviews', id), {
				reviews: [
					{
						rating: 5,
						photoURL,
						text: reviewValue,
						username: displayName,
					},
				],
			})
			setReviewsData({
				reviews: [
					{
						rating: 5,
						photoURL,
						text: reviewValue,
						username: displayName,
					},
				],
			})
			setLoading(true)
		}
	}

	return (
		<main className='mt-[50px] rounded-xl border bg-card text-card-foreground shadow px-[30px] py-[30px] dark:border-slate-600 max-lg:px-[20px]'>
			<h1 className='text-4xl font-inter font-bold mb-5'>Reviews</h1>
			{!isAuth && (
				<div className='w-full flex justify-center'>
					<div className='flex flex-col items-center justify-center z-10 !blur-0 absolute'>
						<h1 className='text-3xl font-bold !blur-0 z-3 dark:text-slate-200'>
							To leave a review you must be logged in 🤨
						</h1>
						<Button className='mt-4' asChild>
							<Link to='/auth'>Login</Link>
						</Button>
					</div>
				</div>
			)}
			<div className={!isAuth ? 'blur' : ''}>
				<Textarea
					value={reviewValue}
					onChange={e => setReviewValue(e.target.value)}
					placeholder='Throw your review here'
					disabled={!isAuth}
				/>
				<Button className='mt-2' onClick={handleSend} disabled={!isAuth}>
					Send this shit!
				</Button>
			</div>
			<Separator className='my-5' />
			<section className='flex flex-col-reverse gap-y-5'>
				{!loading
					? reviewsData?.reviews.map((review, index) => {
							return (
								<Card key={index}>
									<CardHeader className='flex flex-row items-center justify-between'>
										<Avatar>
											<AvatarImage src='https://github.com/shadcn.png' />
											<AvatarFallback>{review.username?.substring(0, 2)}</AvatarFallback>
										</Avatar>
										<h3 className='text-xl font-bold font-inter'>{review.username}</h3>
										<h3 className='text-xl font-bold font-inter'>
											Rating: {Math.round(review.rating * 2) / 2}
										</h3>
									</CardHeader>
									<CardContent>
										<CardDescription className='text-slate-950'>{review.text}</CardDescription>
									</CardContent>
								</Card>
							)
					  })
					: loading && (
							<div>
								<Skeleton className='w-full h-[120px] mt-5' />
								<Skeleton className='w-full h-[120px] mt-5' />
								<Skeleton className='w-full h-[120px] mt-5' />
							</div>
					  )}
			</section>
		</main>
	)
}

export default Reviews
