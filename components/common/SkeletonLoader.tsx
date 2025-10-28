const SkeletonLoader = ({ count = 3, variant = "cards" }: SkeletonLoaderProps) => {
  switch (variant) {
    case "profile":
            return (
        <div className="animate-pulse w-full max-w-5xl mx-auto space-y-8">
          {/* Header Card */}
          <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden mb-6">
            <div className="relative h-32 bg-muted/40"></div>
            <div className="px-6 pb-6 md:px-8 md:pb-8 -mt-12">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Avatar */}
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-muted border-4 border-card shadow-xl" />

                  {/* Name and Email */}
                  <div className="space-y-3 mt-8 md:mt-0">
                    <div className="h-5 w-36 bg-muted rounded" />
                    <div className="h-4 w-48 bg-muted/70 rounded" />
                  </div>
                </div>

                {/* Edit Button */}
                <div className="h-10 w-32 bg-muted rounded-full" />
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Info */}
            <div className="bg-card rounded-xl shadow-lg border border-border p-6 space-y-5">
              <div className="h-5 w-48 bg-muted rounded mb-4" />
              <div className="space-y-4">
                {/* Phone */}
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-muted/70 rounded" />
                  <div className="h-10 w-full bg-muted/40 rounded-lg" />
                </div>
                {/* Address */}
                <div className="space-y-2">
                  <div className="h-3 w-20 bg-muted/70 rounded" />
                  <div className="h-10 w-full bg-muted/40 rounded-lg" />
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-card rounded-xl shadow-lg border border-border p-6 space-y-5">
              <div className="h-5 w-48 bg-muted rounded mb-4" />
              <div className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <div className="h-3 w-32 bg-muted/70 rounded" />
                  <div className="h-10 w-full bg-muted/40 rounded-lg" />
                </div>
                {/* Plan */}
                <div className="space-y-2">
                  <div className="h-3 w-28 bg-muted/70 rounded" />
                  <div className="h-10 w-full bg-muted/40 rounded-lg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      );

     case "pricing":
      return (
          Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className="relative bg-card rounded-2xl p-8 shadow-sm animate-pulse"
            >
              {/* Plan Header */}
              <div className="text-center mb-8 space-y-4">
                <div className="h-6 w-32 bg-muted mx-auto rounded" />
                <div className="h-10 w-24 bg-muted mx-auto rounded" />
                <div className="h-10 w-full bg-muted rounded-full" />
              </div>

              {/* Features Section */}
              <div className="space-y-5">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-muted rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-28 bg-muted rounded" />
                      <div className="h-3 w-36 bg-muted/70 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
      );
    
      default: <div></div>;
  }
};

export default SkeletonLoader;