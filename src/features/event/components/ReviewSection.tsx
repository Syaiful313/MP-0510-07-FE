"use client"
import React, { useState } from 'react';
import useCreateReview from '@/hooks/api/review/useCreateReview';
import { GetEventReviewsResponse } from '@/types/review';
import { Star } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useRouter } from 'next/navigation';

interface ReviewSectionProps {
  eventId: number;
  isEventFinished: boolean;
  reviews: GetEventReviewsResponse | null;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({
  eventId,
  isEventFinished,
  reviews,
}) => {
  const { mutateAsync: createReview, status: createStatus } = useCreateReview();
  const router = useRouter();
  const createLoading = createStatus === 'pending';
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createReview({
        eventId,
        rating,
        comment
      });
      setRating(0);
      setComment('');
      router.refresh();
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  const StarRating = ({ filled, hovered }: { filled: boolean; hovered: boolean }) => (
    <Star 
      className={`w-6 h-6 cursor-pointer ${
        filled || hovered ? 'text-emerald-500 fill-emerald-500' : 'text-black/20 dark:text-white/20'
      }`}
    />
  );

  const ReviewStars = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-emerald-500 fill-emerald-500' : 'text-black/20 dark:text-white/20'
          }`}
        />
      ))}
    </div>
  );

  if (!isEventFinished) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-black/60 dark:text-white/60">
            Reviews can only be submitted after the event has finished.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Event Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold">
              {reviews?.data.summary.averageRating.toFixed(1) || '0.0'}
            </div>
            <div>
              <ReviewStars rating={reviews?.data.summary.averageRating || 0} />
              <p className="text-sm text-black/65 mt-1 dark:text-white/65">
                {reviews?.data.summary.totalReviews || 0} reviews
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                  >
                    <StarRating 
                      filled={star <= rating}
                      hovered={star <= hoveredRating}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Comment</label>
              <textarea
                className="w-full min-h-[100px] p-3 border border-black/15 rounded-md resize-none bg-white text-black placeholder:text-black/40 dark:border-white/15 dark:bg-black dark:text-white dark:placeholder:text-white/40"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                placeholder="Share your experience about this event..."
              />
            </div>
            <button
              type="submit"
              disabled={createLoading || rating === 0}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 
                       px-4 py-2 rounded-md transition-colors
                       disabled:bg-emerald-600/40 disabled:cursor-not-allowed"
            >
              {createLoading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {!reviews ? (
            <p className="text-center text-black/60 dark:text-white/60">Reviews are currently unavailable.</p>
          ) : reviews.data.reviews.length === 0 ? (
            <p className="text-center text-black/60 dark:text-white/60">No reviews yet</p>
          ) : (
            <div className="space-y-4">
              {reviews.data.reviews.map((review) => (
                <div key={review.id}>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center dark:bg-emerald-950">
                      {review.user.profilePicture ? (
                        <img 
                          src={review.user.profilePicture}
                          alt={review.user.fullname}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-emerald-700 dark:text-emerald-400">{review.user.fullname[0]}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{review.user.fullname}</p>
                      <ReviewStars rating={review.rating} />
                      <p className="mt-2 text-black/65 dark:text-white/65">{review.comment}</p>
                      <p className="mt-1 text-sm text-black/50 dark:text-white/50">
                        {new Intl.DateTimeFormat("en-US", {
                          timeZone: "Asia/Jakarta",
                        }).format(new Date(review.createdAt))}
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSection;
